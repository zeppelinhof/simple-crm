import { Component } from '@angular/core';
import { Firestore, collection, onSnapshot, query, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { UserFirebaseService } from '../user-firebase.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();
  deleting: boolean = false;
  allUsers: any = [];
  allUserIds: string[] = [];
  countUsers: number = 0;

  constructor(private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog,
    private router: Router,
    private userFirebase: UserFirebaseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id')!;
      this.getUser(this.userId);
    });
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
    });

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.allUsers = [];
      this.allUserIds = [];
      querySnapshot.forEach((element) => {
        this.allUsers.push(this.userFirebase.setUserObject(element.data(), element.id));
        this.allUserIds.push(element.id);
      });
      this.countUsers = this.allUserIds.length;
      // console.log("All current users: ", this.allUsers);
    });
  }

  async writeUserData(userId: string) {
    const documentRef = doc(this.firestore, 'users', userId);
    const docSnapshot = await getDoc(documentRef);
    this.user = new User(docSnapshot.data());
    // console.log("Retrieved user:", this.user);
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // this.user.toJSON() = diesen Benutzer (Typ: User) in JSON umwandeln
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  async deleteUser(colId: "users", docId: string) {
    this.deleting = true;
    await deleteDoc(this.userFirebase.getSingleDocRef(colId, docId)).catch(
      (err) => { console.log(err); }
    ).then(() => {
      this.deleting = false;
      this.router.navigate(['/user']);
    });
  }

  switchUser(forward: boolean): string {
    if (this.countUsers > 0) {
      for (let index: number = 0; index < this.countUsers; index++) {
        const cId = this.allUserIds[index];
        if (cId == this.userId) {
          if (forward) {
            if (index == this.countUsers - 1) {
              return '';
            }
            return this.allUserIds[index + 1]
          } else {
            if (index == 0) {
              return '';
            }
            return this.allUserIds[index - 1]
          }
        }
      }
    }
    return '';
  }

}
