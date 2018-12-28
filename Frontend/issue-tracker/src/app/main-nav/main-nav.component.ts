import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  userDetails = this.appService.getUserInfoFromLocalstorage();
  url: string = "";

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private appService: AppService, public snackBar: MatSnackBar) {
    router.events.subscribe((val) => {
      this.url = this.router.url;
    });
   }

  logout: any = () => {
    this.userDetails = this.appService.getUserInfoFromLocalstorage();
    this.appService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.snackBar.open('Logged out sucessfully!', 'Close', { duration: 4000, });
        console.log(apiResponse)
        Cookie.delete('authtoken');
        Cookie.delete('receiverId');
        Cookie.delete('receiverName');
        this.router.navigate(['/']);
      } else {
        console.log(apiResponse.message)
      } // end condition
    }, (err) => {
      this.snackBar.open('Some error occured', 'Close', { duration: 4000, });
      console.log('some error occured')
    });
  } // end logout


}
