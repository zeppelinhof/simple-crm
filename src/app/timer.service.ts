import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timer = new BehaviorSubject<number>(0);
  uimer = new BehaviorSubject<string>("");

  nameList = [
    'Hans',
    'Peter',
    'Claudia',
    'Lisa'
  ]

  constructor() { this.start(); }


  start() {
    let i: number = 0;
    setInterval(() => {

      let newValue = this.timer.value + 1;
      this.timer.next(newValue)
    }, 1000);

    setInterval(() => {
      i = i % this.nameList.length;
      let newValue = this.nameList[i];
      this.uimer.next(newValue);
      i++;
    }, 500);
  }
}
