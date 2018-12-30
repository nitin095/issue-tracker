import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from './../app.service';

@Pipe({
  name: 'userName'
})

export class UserNamePipe implements PipeTransform {

  constructor(private appService: AppService) { }

  transform(value: any, args?: any) {
    if (!value) return null;
    return new Promise((resolve, reject) => {
      this.appService.getUser(value).subscribe(
        response => {
          if (args === 'initials') resolve(`${response.data.firstName[0]}${response.data.lastName[0]}`)
          else resolve(`${response.data.firstName} ${response.data.lastName}`)
        },
        error => {
          reject('')
        }
      )
    })

  }//end transform

}
