import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  allIssues: any = [];

  constructor() { }

  setIssues(issues) {
    this.allIssues = issues
  }

  getIssues() {
    return this.allIssues
  }

}
