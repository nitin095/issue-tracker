import { Component, OnInit, OnChanges ,ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { AppService } from './../../app.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  @Input() issues: any;
  userDetails = this.appService.getUserInfoFromLocalstorage();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'status', 'reporter', 'date', 'flag'];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.issues);
  }

  ngOnChanges() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.issues);
  }

}
