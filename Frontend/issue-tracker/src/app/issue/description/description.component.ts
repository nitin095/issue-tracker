import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service'
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  userDetails = this.appService.getUserInfoFromLocalstorage();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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
    this.loading = true;
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
    this.loading = true;
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
    console.log('DATA: ',data)
    this.loading = true;
    this.appService.editIssue(this.issue.issueId, data).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issue = response.data;
          console.log(response)
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

  editComment(id, body) {
    this.loading = true;
    this.appService.editComment(this.issue.issueId, id, body).subscribe(
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

  addLabel(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add label
    if ((value || '').trim()) {
      this.issue.labels.push(value.trim());
      this.editIssue({labels:this.issue.labels})
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeLabel(label): void {
    const index = this.issue.labels.indexOf(label);

    if (index >= 0) {
      this.issue.labels.splice(index, 1);
      this.editIssue({labels:this.issue.labels})
    }
  }

  deleteComment(id) {
    this.loading = true;
    this.appService.deleteComment(this.issue.issueId, id).subscribe(
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

  deleteIssue() {
    this.loading = true;
    this.appService.deleteIssue('req.body.projectId', this.issue.issueId).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.router.navigate(['dashboard']);
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
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
