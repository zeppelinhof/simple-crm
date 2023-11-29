import { Injectable } from '@angular/core';
import { Firestore, updateDoc, doc, collection, query, onSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, of, Observer } from 'rxjs';
import { AccordeonUserData } from 'src/models/accordeon-user-data.class';


@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {
  imagesPathList: string[] = [];
  namesList: string[] = [];
  citiesList: string[] = [];
  emailsList: string[] = [];
  currentPicture = new BehaviorSubject<string>("assets/img/profiles/man1.jpg");
  currentUser = new BehaviorSubject<AccordeonUserData>(new AccordeonUserData({ firstName: '', city: '', email: '' }));
  accVisible = new BehaviorSubject<boolean>(false);
  currentEmail = new BehaviorSubject<string>("");

  constructor(private firestore: Firestore) { this.start(); }

  start() {

    const q = query(collection(this.firestore, 'users'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((element) => {
        let profilePath = element.data()['profile'];
        if (profilePath !== '') {
          this.imagesPathList.push(profilePath);
          this.namesList.push(element.data()['firstName']);
          this.citiesList.push(element.data()['city']);
          this.emailsList.push(element.data()['email']);
          this.switchPathUser();
        }
      })
    });

  }

  switchPathUser() {
    
    let index: number = 0;
    setInterval(() => {
      index = index % this.imagesPathList.length;
      this.currentPicture.next(this.imagesPathList[index]);

      this.currentUser.next(new AccordeonUserData(
        { firstName: this.namesList[index], city: this.citiesList[index], email: this.emailsList[index] }
      ));
      index++;
    }, 3000);

    setInterval(()=>{
      this.accVisible.next(true);
    }, 10000);

  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }

  setUserObject(obj: any, id: string) {
    return {
      customIdName: id,
      firstName: obj.firstName,
      email: obj.email,
      lastName: obj.lastName,
      birthdate: obj.birthDate,
      city: obj.city,
      street: obj.street,
      zipCode: obj.zipCode,
      profile: obj.profile
    }
  }

}
