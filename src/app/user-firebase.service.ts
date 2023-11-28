import { Injectable } from '@angular/core';
import { Firestore, updateDoc, doc, collection, query, onSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, of, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {
  imagesPathList: string[] = [];
  namesList: string[] = [];
  currentPicture = new BehaviorSubject<string>("");
  currentName = new BehaviorSubject<string>("");

  constructor(private firestore: Firestore) { this.start(); }

  start() {
    const q = query(collection(this.firestore, 'users'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((element) => {
        let profilePath = element.data()['profile'];
        if (profilePath !== '') {
          this.imagesPathList.push(profilePath);
          this.namesList.push(element.data()['firstName']);
        }        
      })
    });
    this.switchPathUser();
  }

  switchPathUser() {
    let index = 0;
    setInterval(() => {
      index = index % this.imagesPathList.length;
      this.currentPicture.next(this.imagesPathList[index]);
      this.currentName.next(this.namesList[index]);
      index++;
    }, 1000);
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }

}
