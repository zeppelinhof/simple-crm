import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';
import { throttleTime, filter, first } from 'rxjs';
import { AccordeonUserData } from 'src/models/accordeon-user-data.class';

@Component({
  selector: 'app-accordeon-flush',
  templateUrl: './accordeon-flush.component.html',
  styleUrls: ['./accordeon-flush.component.css']
})
export class AccordeonFlushComponent implements OnInit {
  userAcc: AccordeonUserData = new AccordeonUserData({ firstName: '', city: ''});
  accVisible: boolean = false;
  

  constructor(private userFirebase: UserFirebaseService) { }

  ngOnInit() {
    this.userFirebase.currentUser
      .pipe(throttleTime(1000))
      .subscribe((obj) => {
        console.log('Das Objekt hier:', obj);
        this.userAcc = obj;
      });

      this.userFirebase.accVisible
      .subscribe((boo)=>{this.accVisible = boo});
  }

}
