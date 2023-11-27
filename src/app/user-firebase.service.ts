import { Injectable } from '@angular/core';
import { Firestore, updateDoc, doc, collection  } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {

  constructor(private firestore: Firestore ) {}

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }

}
