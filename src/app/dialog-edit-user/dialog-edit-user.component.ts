import { Component } from '@angular/core';
import { Firestore, doc, updateDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  user!: User;
  userId!: string;
  loading = false;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore){}


  async saveUser(){
    this.loading = true
    debugger
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

  add(a: number, b: number): number{
    return a+b;
  }

}
