import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { UserNamePipe } from './user-name.pipe';
import { SanitizedHTMLPipe } from './sanitized-html.pipe';
import { IssueTitlePipe } from './issue-title.pipe';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatProgressBarModule,
  MatDividerModule,
  MatRippleModule,
  MatFormFieldModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  declarations: [DataTableComponent, UserNamePipe, SanitizedHTMLPipe, IssueTitlePipe],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  exports: [
    DataTableComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule,
    MatDividerModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    MatSlideToggleModule,
    UserNamePipe,
    IssueTitlePipe,
    SanitizedHTMLPipe,
    FileUploadModule
  ]
})
export class SharedModule { }
