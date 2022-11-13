import { from, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: Storage) { }

  uploadImage(image: File, path: string): Observable<string> {
    const reference = ref(this.storage, path);
    const upload = from(uploadBytes(reference, image));
    return upload.pipe(switchMap((result) =>
      getDownloadURL(result.ref)
    ));
  }
}
