import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, onSnapshot, query } from '@angular/fire/firestore';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers:any = [];

  constructor(public dialog: MatDialog, private firestore: Firestore, private userFirebase: UserFirebaseService) { }

  ngOnInit() {

    const q = query(collection(this.firestore, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.allUsers = [];
      querySnapshot.forEach((element) => {
        this.allUsers.push(this.userFirebase.setUserObject(element.data(), element.id));
      });
      console.log("All current users: ", this.allUsers);
    });

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
