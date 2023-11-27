import { Component } from '@angular/core';
import { Firestore, doc, updateDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DropFileService } from '../drop-file.service';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  user!: User;
  userId!: string;
  loading = false;
  // birthDate = this.user.birthDate;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, 
    private firestore: Firestore, 
    public dropFileService: DropFileService,
    private userFirebase: UserFirebaseService){}


  async saveUser(){
    this.loading = true
    this.user.profile = this.dropFileService.imageSource;
    this.dropFileService.imageChosen = false;
    let docRef = this.userFirebase.getSingleDocRef('users', this.userId);
    await updateDoc(docRef, this.user.toJSON()).catch(
      (err) => { console.log(err); }
    ).then(()=>{
      this.loading = false;
      this.dialogRef.close();
    });
  }

}
