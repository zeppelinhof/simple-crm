import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, onSnapshot, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  users:any = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit() {

    const q = query(collection(this.firestore, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = [];
      querySnapshot.forEach((element) => {
        debugger
        this.users.push(element.data());
      });
      console.log("Current cities in CA: ", this.users);
    });

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  // setObject(obj: any, id: string): User {
  //   debugger
  //   return obj.toJSON();
  // }

}
