import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, onSnapshot, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers:any = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit() {

    const q = query(collection(this.firestore, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.allUsers = [];
      querySnapshot.forEach((element) => {
        this.allUsers.push(this.setUserObject(element.data(), element.id));
      });
      console.log("Current cities in CA: ", this.allUsers);
    });

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  setUserObject(obj: any, id: string) {
    return {
      customIdName: id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      birthdate: obj.birthDate,
      city: obj.city,
      street: obj.street,
      zipCode: obj.zipCode,
      profile: obj.profile
    }
  }

}
