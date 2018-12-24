import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service'
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  userDetails = this.appService.getUserInfoFromLocalstorage();
  loading: Boolean = false;
  newIssue: Boolean = true;
  issue: Array<Object> = [];

  constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
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

}
