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
    console.log(this.searchQuery)
    this.appService.serachIssues(this.searchQuery).subscribe(
      response => {
        if (response.status === 200) {
          this.issues = response.data
        } else {
          console.log(response.message)
        }
      },
      error => {
        this.issues = null
        console.log("some error occured");
        console.log(error)
      }
    )
  }// end  getIssues

}
