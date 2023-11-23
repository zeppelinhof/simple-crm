import { Component } from '@angular/core';
import { Firestore, collection, onSnapshot, query, doc, getDoc, where, QuerySnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  profiles: string[] = [
    'assets/img/profiles/man/man1.jpg',
    'assets/img/profiles/man/man2.png',
    'assets/img/profiles/man/man3.jpg',
    'assets/img/profiles/man/man4.jpg',
    'assets/img/profiles/man/man5.jpg',
    'assets/img/profiles/woman/w1.jpg',
    'assets/img/profiles/woman/w2.jpg',
    'assets/img/profiles/woman/w3.jpg'
  ]

  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id')!;
      this.getUser(this.userId);
    })

  }

  // get user (formatted as User) for single show of user identfied by id
  async getUser(userId: string) {
    const q = query(collection(this.firestore, 'users'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {

        if (change.doc.id === userId) {
          this.writeUserData(userId);
        }

      })
    })
  }

  async writeUserData(userId: string) {
    const documentRef = doc(this.firestore, 'users', userId);
    const docSnapshot = await getDoc(documentRef);
    this.user = new User(docSnapshot.data());
    console.log("Retrieved user:", this.user);
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // this.user.toJSON() = diesen Benutzer (Typ: User) in JSON umwandeln
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

}
