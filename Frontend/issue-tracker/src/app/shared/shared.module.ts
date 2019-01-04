import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { UserNamePipe } from './user-name.pipe';
import { SanitizedHTMLPipe } from './sanitized-html.pipe';
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
  MatSortModule
} from '@angular/material';

@NgModule({
  declarations: [DataTableComponent, UserNamePipe, SanitizedHTMLPipe],
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
    UserNamePipe,
    SanitizedHTMLPipe,
    FileUploadModule
  ]
})
export class SharedModule { }
