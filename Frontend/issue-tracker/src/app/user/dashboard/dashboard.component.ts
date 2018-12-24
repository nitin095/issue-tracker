import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { IssueService } from './../../issue/issue.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails = this.appService.getUserInfoFromLocalstorage();
  loading: Boolean = false;
  allIssues: any;

  constructor(
    private _route: ActivatedRoute, 
    private router: Router, 
    private appService: AppService, 
    public snackBar: MatSnackBar,
    private issueService: IssueService) { }

  ngOnInit() {
  
  }

}
