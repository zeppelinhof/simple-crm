import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { UserFirebaseService } from '../user-firebase.service';
import { Observable, Observer, of } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showTime: number = 0;
  showProfile: string = 'assets/img/profiles/man1.jpg';
  showName: string = '';
  zahlen: number = 0;
  numbers: number = 0;
  imagesPathList: string[] = [
    'assets/img/profiles/w1.jpg',
    'assets/img/profiles/w2.jpg',
    'assets/img/profiles/man1.jpg',
    'assets/img/profiles/man3.jpg'
  ];

  constructor(public time: TimerService,
    private userFirebase: UserFirebaseService) { }


  ngOnInit(): void {
    this.time.timer
      .subscribe((timePassed) => {
        this.showTime = timePassed;
      });

    this.userFirebase.currentPicture
      .subscribe((pic) => {
        this.showProfile = pic;
      });

    this.userFirebase.currentName
      .subscribe((name) => {
        this.showName = name;
      });

    const numbers$ = of(1, 2, 3);
    numbers$.subscribe({
      next: value => {
        this.zahlen = value;
        console.log('Observable emitted the next value: ' + value);
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('Observable emitted the complete notification')
    });

    const sequence = new Observable(this.sequenceSubscriber);
    sequence.subscribe({
      next(num) { console.log(num); },
      complete() { console.log('Finished sequence'); }
    });
  }

  sequenceSubscriber(observer: Observer<number>) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();

    return { unsubscribe() { } };
  }


}
