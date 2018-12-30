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
  isDrawerOpened: Boolean = true;
  allIssues: any;

  constructor(
    private _route: ActivatedRoute, 
    private router: Router, 
    private appService: AppService, 
    public snackBar: MatSnackBar,
    private issueService: IssueService) { }

  ngOnInit() {
    this.getIssues()
  }

  getIssues() {
    this.loading = true
    this.appService.getIssues(this.userDetails.userId).subscribe(
      response => {
        this.loading = false
        if (response.status === 200) {
          console.log(response.data)
          this.allIssues = response.data
        } else {
          console.log(response.message)
        }
      },
      error => {
        this.loading = false
        this.allIssues = null
        console.log("some error occured");
        console.log(error)
      }
    )
  }// end  getIssues

}
