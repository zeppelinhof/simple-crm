import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { Firestore, updateDoc, doc, collection, query, onSnapshot, QuerySnapshot } from '@angular/fire/firestore'
import { UserFirebaseService } from '../user-firebase.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showTime: number = 0;
  showProfile: string = 'assets/img/profiles/man1.jpg';
  imagesPathList: string[] = [
    'assets/img/profiles/w1.jpg',
    'assets/img/profiles/w2.jpg',
    'assets/img/profiles/man1.jpg',
    'assets/img/profiles/man3.jpg'
  ];

  constructor(public time: TimerService,
    private userFirebase: UserFirebaseService) {}


  ngOnInit(): void {
    this.time.timer
      .subscribe((timePassed) => {
        this.showTime = timePassed;
      });

    this.userFirebase.currentPicture
      .subscribe((pic) => {
        this.showProfile = pic;
      });
  }

}
