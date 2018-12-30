import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userDetails = this.appService.getUserInfoFromLocalstorage();
  loading: Boolean;
  issues: any;
  searchQuery: String;

  constructor(private _route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.searchQuery = this._route.snapshot.paramMap.get('searchQuery');
      this.searchIssues()
    });
  }

  searchIssues() {
    this.loading = true;
    this.appService.serachIssues(this.searchQuery).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.issues = response.data
        } else {
          this.issues = null;
          console.log(response.message)
        }
      },
      error => {
        this.loading = false;
        this.issues = null
        console.log("some error occured");
        console.log(error)
      }
    )
  }// end  getIssues

}
