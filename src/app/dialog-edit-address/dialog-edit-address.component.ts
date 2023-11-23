import { Component } from '@angular/core';
import { Firestore, updateDoc, doc, collection  } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {

  user!: User;
  userId!: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore){}


  async saveUser(){
    this.loading = true;
    let docRef = this.getSingleDocRef('users', this.userId);
    await updateDoc(docRef, this.user.toJSON()).catch(
      (err) => { console.log(err); }
    ).then(()=>{
      this.loading = false;
      this.dialogRef.close();
    });
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }
}
