import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescriptionComponent } from './description/description.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'issue/browse/:issueId', component: DescriptionComponent },
  { path: 'issue/search/:query', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IssueRoutingModule { }
