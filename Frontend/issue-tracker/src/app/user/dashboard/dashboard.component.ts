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
  issuesStatusCount: Object = { inProgress: 0, done: 0, toDo: 0, backlog: 0 };
  activeCategory: Object = { assigned: true, reported: false, watching: false }

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    public snackBar: MatSnackBar,
    private issueService: IssueService) { }

  ngOnInit() {
    this.getProjects()
  }

  getProjects() {
    this.loading = true;
    this.appService.getAllProjects(this.userDetails.userId).subscribe(
      response => {
        this.loading = false
        if (response.status === 200) {
          console.log(response.data)
          this.allprojects = response.data;
          this.activeProject = this.allprojects[0].projectId
          this.changeProject()
        } else {
          this.getIssues()
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
    console.log('changing project:')
    this.loading = true;
    this.appService.getProjectIssues(this.activeProject).subscribe(
      response => {
        this.loading = false
        if (response.status === 200) {
          console.log(response.data)
          this.allIssues = response.data;
          this.issues = this.allIssues;
          this.makeActive('assigned')
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

  makeActive(category) {
    this.activeCategory = Object.entries(this.activeCategory).map(x => false);
    this.activeCategory[category] = true;
    switch (category) {
      case 'assigned':
        if (this.allIssues) {
          this.issues = this.allIssues.filter(issue => issue.assignee.includes(this.userDetails.userId));
          this.getIssuesStatusCount()
        }
        if (this.issues && this.issues.length < 1) this.issues = null
        break;
      case 'reported':
        if (this.allIssues) {
          this.issues = this.allIssues.filter(issue => issue.reporter == this.userDetails.userId);
          this.getIssuesStatusCount()
        }
        if (this.issues && this.issues.length < 1) this.issues = null
        break;
      case 'watching':
        if (this.allIssues) {
          this.issues = this.allIssues.filter(issue => issue.watchers.includes(this.userDetails.userId));
          this.getIssuesStatusCount()
        }
        if (this.issues && this.issues.length < 1) this.issues = null
        break;
    }
  }//end makeActive

  getIssuesStatusCount() {
    for(let prop in this.issuesStatusCount){
      this.issuesStatusCount[prop] = 0
    }
    for (let issue of this.issues) {
      switch (issue.status) {
        case 'inProgress':
          this.issuesStatusCount[issue.status]++;
          break;
        case 'toDo':
          this.issuesStatusCount[issue.status]++;
          break;
        case 'done':
          this.issuesStatusCount[issue.status]++;
          break;
        case 'backlog':
          this.issuesStatusCount[issue.status]++;
          break;
      }
    }
  }

  reportNewIssue() {
    if (this.activeProject) {
      this.router.navigate(['/issue/browse', 'new'], { queryParams: { project: this.activeProject } });
    } else {
      this.snackBar.open('Select a project first.', 'close', { duration: 4000 })
    }

  }

}
