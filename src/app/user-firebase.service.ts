import { Injectable } from '@angular/core';
import { Firestore, updateDoc, doc, collection, query, onSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {
  imagesPathList: string[] = [];
  currentPicture = new BehaviorSubject<string>("");

  constructor(private firestore: Firestore) { this.start(); }

  start() {
    const q = query(collection(this.firestore, 'users'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((element) => {
        this.imagesPathList.push(element.data()['profile']);
      })
    });
    this.switchPathUser();
  }

  switchPathUser() {
    let index = 0;
    setInterval(() => {
      index = index % this.imagesPathList.length;
      this.currentPicture.next(this.imagesPathList[index]);
      index++;
    }, 1000);
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }

}
