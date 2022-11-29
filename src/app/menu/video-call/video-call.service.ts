import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  stunServers = { iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    }],
    iceCandidatePoolSize: 10,
  }
  pc = new RTCPeerConnection(this.stunServers);
  localStream = null;
  remoteStream = null;

  constructor() { }

}
