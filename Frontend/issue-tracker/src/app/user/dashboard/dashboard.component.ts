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
  allprojects: any;
  activeProject: any;
  allIssues: any;
  allReporters: Set<String>;
  issues: any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    public snackBar: MatSnackBar,
    private issueService: IssueService) { }

  ngOnInit() {
    this.getProjects()
    this.getIssues()
  }

  getProjects() {
    this.loading = true;
    this.appService.getAllProjects(this.userDetails.userId).subscribe(
      response => {
        this.loading = false
        if (response.status === 200) {
          console.log(response.data)
          this.allprojects = response.data;
        } else {
          console.log(response.message)
        }
      },
      error => {
        this.loading = false
        this.allprojects = null
        console.log("some error occured");
        console.log(error)
      }
    )
  }
  
  getIssues() {
    this.loading = true
    this.appService.getIssues(this.userDetails.userId).subscribe(
      response => {
        this.loading = false
        if (response.status === 200) {
          console.log(response.data)
          this.allIssues = response.data;
          this.issues = response.data;
          this.allReporters = new Set(this.allIssues.map(x => x.reporter));
          console.log(this.allReporters)
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

  filterIssues(filterValue) {
    let keywords = filterValue.toLowerCase().split(' ');
    this.issues = this.allIssues.filter(issue => {
      for (let keyword of keywords) {
        if ((issue.title + issue.status + new Date(issue.createdOn)).toLowerCase().includes(keyword)) {
          return true
        } else return false
      }
    });
  }

  filterReporter(filterValue) {
    this.issues = this.allIssues.filter(issue => issue.reporter === filterValue)
  }

  resetIssues() {
    this.issues = this.allIssues
  }

  changeProject() {
    
  }

}
