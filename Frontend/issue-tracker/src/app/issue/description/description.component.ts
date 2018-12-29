import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service'
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  userDetails = this.appService.getUserInfoFromLocalstorage();
  loading: Boolean = false;
  newIssue: Boolean = true;
  issue: any;
  addDescription: Boolean = false;
  description: String;
  comment: String;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no'
  }

  constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let issueId = this._route.snapshot.paramMap.get('issueId');
      if (issueId !== 'new') this.getIssue(issueId)
    });
  }

  getIssue(issueId) {
    this.newIssue = false;
    this.appService.getSingleIssue(issueId).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issue = response.data;
          console.log(response.data);
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }
    )
  }

  createIssue(title) {
    let data = {
      projectId: 'req.body.projectId',
      reporter: this.userDetails.userId,
      title: title,
    }
    console.log('creating issue:')
    console.table(data)
    this.appService.createIssue(data).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.newIssue = false;
          this.issue = response.data;
          console.table(response.data)
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }
    )
  }

  createComment() {
    this.loading = true;
    let newComment = {
      createdBy: this.userDetails.userId,
      body: this.comment
    }
    this.appService.createComment(this.issue.issueId, newComment).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issue = response.data;
          this.comment = null;
          console.log(response.data)
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }
    )
  }

  editIssue(data) {
    this.loading = true;
    this.appService.editIssue(this.issue.issueId, data).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issue = response.data;
          console.table(response.data)
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }
    )
  }

  editComment(id,body) {
    this.loading = true;
    this.appService.editComment(this.issue.issueId,id,body).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issue = response.data;
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }
    )
  }//end editComment

  deleteComment(id) {
    this.loading = true;
    this.appService.deleteComment(this.issue.issueId,id).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issue = response.data;
          console.table(response.data)
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }
    )
  }

}
