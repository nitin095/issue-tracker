import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from './../app.service';

@Pipe({
  name: 'issueTitle'
})
export class IssueTitlePipe implements PipeTransform {

  constructor(private appService: AppService) { }

  transform(value: any, args?: any): any {
    if (!value) return null;
    return new Promise((resolve, reject) => {
      this.appService.getSingleIssue(value).subscribe(
        response => {
          resolve(response.data.title)
        },
        error => {
          reject('')
        }
      )
    })
  }

}
