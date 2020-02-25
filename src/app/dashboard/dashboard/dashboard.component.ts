import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  status: Status;
  statuses = {
    'Все': null,
    'Активные': Status.Active,
    'Заблокированные': Status.Blocked
  }

  constructor() { }

  ngOnInit() {
    this.status = null;
  }

  onActiveTab(activeTab) {
    this.status = this.statuses[activeTab]
  } 
}
