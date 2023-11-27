import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { throttle, throttleTime } from 'rxjs/operators'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showTime: number = 0;
  showName: string = '';

  constructor(public time: TimerService){}
  


  ngOnInit(): void {
    this.time.timer
    .subscribe((timePassed) => {
      this.showTime = timePassed;
    });

    this.time.uimer.subscribe((name)=>{
      this.showName = name
    });
  }

}
