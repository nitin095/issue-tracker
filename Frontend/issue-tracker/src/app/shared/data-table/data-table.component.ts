import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { AppService } from './../../app.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  userDetails = this.appService.getUserInfoFromLocalstorage();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'status', 'reporter', 'date', 'flag'];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    this.appService.getIssues(this.userDetails.userId).subscribe(
      response => {
        if (response.status === 200) {
          this.dataSource = new DataTableDataSource(this.paginator, this.sort, response.data);
        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log("some error occured");
        console.log(error)
      }
    )
  }// end  getIssues

}
