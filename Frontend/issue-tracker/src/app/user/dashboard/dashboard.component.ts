import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { IssueService } from './../../issue/issue.service';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from './../../socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );
  userDetails = this.appService.getUserInfoFromLocalstorage();
  loading: Boolean = false;
  isDrawerOpened: Boolean = true;
  showMobileFilters: Boolean = false;
  allprojects: any;
  activeProject: any;
  allIssues: any;
  allReporters: Set<String>;
  issues: any;
  selectedReporter: String;
  issuesStatusCount = { inProgress: 0, done: 0, toDo: 0, backlog: 0 };
  activeCategory = { assigned: true, reported: false, watching: false };
  authToken: any;
  notification: any = {};

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    public snackBar: MatSnackBar,
    public SocketService: SocketService,
    private breakpointObserver: BreakpointObserver,
    private issueService: IssueService) { }

  ngOnInit() {
    this.getProjects();
    this.authToken = Cookie.get('authtoken');
    this.verifyUserConfirmation();
    this.getNotifications();
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
          this.allReporters = new Set(this.allIssues.map(x => x.reporter));
          this.makeActive('assigned')
        } else {
          this.allIssues = null;
          this.issues = null;
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
    this.activeCategory = { assigned: false, reported: false, watching: false };
    this.activeCategory[category] = true;
    switch (category) {
      case 'assigned':
        if (this.allIssues) {
          this.issues = this.allIssues.filter(issue => issue.assignee === this.userDetails.userId);
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
    for (let prop in this.issuesStatusCount) {
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

  verifyUserConfirmation: any = () => {
    this.SocketService.verifyUser()
      .subscribe((data) => {
        this.SocketService.setUser(this.authToken);
      });
  }

  getNotifications(): any {

    this.SocketService.notification().subscribe((data) => {
      console.log(`%cNotification received!`, 'color:blue;font-weight:bold');
      console.log(data);

      this.notification = { event: data.event, editor: data.editor, time: data.time, issueId: data.issueId, data: data.data, display: true }

    });

  }//end getAlerts


}
