import { Component, OnInit } from '@angular/core';
import { AuthTokenManager } from '../services/auth-token-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

  parts = null
  startDate;
  startTime;
  endDate;
  endTime;

  constructor(private authTokenManager: AuthTokenManager,
    private router: Router) {
    authTokenManager.get('/part').subscribe(data => {
      if (data.success) {
        this.parts = data.list.map(m =>
        {
          return {
            include: false,
            part: m
          }
        })
      }
    });
  }

  ngOnInit() {
  }

  submit() {
    let start = new Date(this.startDate);
    let t = this.startTime.split(':');
    start.setHours(parseInt(t[0]), parseInt(t[1]));
    
    let end = new Date(this.endDate);
    t = this.endTime.split(':');
    end.setHours(parseInt(t[0]), parseInt(t[1]));

    let partsToSubmit = this.parts.filter(m => m.include).map(m => m.part._id);
    
    this.authTokenManager.post('/interview', {
      start_time: start,
      end_time: end,
      parts: partsToSubmit
    }).subscribe(data => {
      if (!data.success) {
        alert(data.msg);
      }
      else this.router.navigate(['/']);
    });
  }

}
