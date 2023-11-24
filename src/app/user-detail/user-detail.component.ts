import { Component } from '@angular/core';
import { Firestore, collection, onSnapshot, query, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();
  deleting: boolean = false;

  constructor(private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog,
    private router: Router) { }

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

  async deleteUser(colId: "users", docId: string) {
    this.deleting = true;
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch(
      (err) => { console.log(err); }
    ).then(()=>{
      this.deleting = false;
      this.router.navigate(['/user']);
    });
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }

}
