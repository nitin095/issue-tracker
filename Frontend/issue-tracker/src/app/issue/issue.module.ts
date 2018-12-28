import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from './../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueRoutingModule } from './issue-routing.module';
import { DescriptionComponent } from './description/description.component';
import { SearchComponent } from './search/search.component';

import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [DescriptionComponent, SearchComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class IssueModule { }
