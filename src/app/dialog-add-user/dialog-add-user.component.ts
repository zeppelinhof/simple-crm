import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {

  loading:boolean = false;

  user = new User();
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore){}

  async saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    await addDoc(collection(this.firestore, 'users'), this.user.toJSON()).then(
      (result: any ) => {
        this.loading = false;
        console.log('adding user finished', result)
        this.dialogRef.close();
      });
  }

}