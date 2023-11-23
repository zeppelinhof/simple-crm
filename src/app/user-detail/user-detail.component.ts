import { Component } from '@angular/core';
import { Firestore, collection, onSnapshot, query, doc, getDoc, where, QuerySnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

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


  // getUsersRef() {
  //   return collection(this.firestore, 'users');
  // }

  // getSingleDocRef(colId: string, docId: string) {
  //   return doc(collection(this.firestore, colId), docId)
  // }
}
