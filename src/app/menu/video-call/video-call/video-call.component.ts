import { UserService } from './../../profile/profile-settings/user.service';
import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import { VideoCallService } from './../video-call.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {

  @ViewChild('userWebcam') userWebcam: HTMLMediaElement;
  @ViewChild('partnerWebcam') partnerWebcam: HTMLMediaElement;
  @ViewChild('code') code: ElementRef;

  firestore = firebase.firestore();

  localStream: MediaStream;
  remoteStream: MediaStream;

  remoteVideo = document.querySelector('#remoteVideo');
  webcamVideo = document.querySelector('#webcamVideo');

  constructor(private videoService: VideoCallService,
    private userService: UserService) { }

  async startWebCam() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true, //zezwolenie na uzywanie video
      audio: true, //zezwolenie na uzywanie mikrofonu
    });
    this.remoteStream = new MediaStream();
    this.localStream.getTracks().forEach((track) => {
      this.videoService.pc.addTrack(track, this.localStream);
    });

    this.videoService.pc.ontrack = event => {
      event.streams[0].getTracks().map(track => {
        this.remoteStream.addTrack(track);
      });
    }

    this.userWebcam.srcObject = this.localStream;
    this.partnerWebcam.srcObject = this.remoteStream;
  }

  async createCall() {
    const callDoc = this.firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidiates = callDoc.collection('answerCandidates');

    this.videoService.pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    }

    const offerDescription = await this.videoService.pc.createOffer();
    await this.videoService.pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      console.info('data: ', data)
      if (!this.videoService.pc.currentRemoteDescription && data?.['answer']){
        const answerDesc = new RTCSessionDescription(data?.['answer']);
        console.info('desc: ', answerDesc)
        this.videoService.pc.setRemoteDescription(answerDesc);
      }

      answerCandidiates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            this.videoService.pc.addIceCandidate(candidate);
          }
        })
      })
    })
  }

  async answerCall() {
    const callId = this.code.nativeElement.value;
    const callDoc = this.firestore.collection('calls').doc(callId);
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidiates = callDoc.collection('answerCandidates');

    this.videoService.pc.onicecandidate = (event) => {
      event.candidate && answerCandidiates.add(event.candidate.toJSON());
    }
    const callData = (await callDoc.get()).data();

    const offerDescription = callData?.['offer'];
    await this.videoService.pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDesc = await this.videoService.pc.createAnswer();
    await this.videoService.pc.setLocalDescription(new RTCSessionDescription(answerDesc));

    const answer = {
      type: answerDesc.type,
      sdp: answerDesc.sdp,
    }

    await callDoc.update({ answer });
    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if(change.type === 'added') {
          let data = change.doc.data();
          this.videoService.pc.addIceCandidate(new RTCIceCandidate(data));
        }
      })
    })
  }


  ngOnInit(): void {
  }

}
