import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from './../shared/shared.module'

import { IssueRoutingModule } from './issue-routing.module';
import { DescriptionComponent } from './description/description.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [DescriptionComponent, SearchComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    SharedModule
  ]
})
export class IssueModule { }
