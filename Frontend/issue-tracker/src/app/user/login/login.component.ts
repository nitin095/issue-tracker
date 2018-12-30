import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service'
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: Boolean = false;

  //models
  public email: String;
  public password: String;
  public loginForm: boolean = true;
  public forgotForm: boolean = false;
  public resetForm: boolean = false;
  public retypePassword: String;
  public resetToken: String;
  public hide = true;

  constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['token']) {
        this.loginForm = false;
        this.resetForm = true
        this.resetToken = params['token'];
      }
    });
  }

  login(): any {
    this.loading = true;
    let loginData = {
      email: this.email,
      password: this.password,
    }

    this.appService.login(loginData).subscribe(
      response => {
        if (response.status === 200) {
          Cookie.set('authtoken', response.data.authToken);
          Cookie.set('receiverId', response.data.userDetails.userId);
          Cookie.set('receiverName', response.data.userDetails.firstName + ' ' + response.data.userDetails.lastName);
          this.appService.setUserInfoInLocalStorage(response.data.userDetails)

          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/dashboard']);
          }, 1000)

        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
          this.loading = false;
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        console.log("some error occured");
        console.log(error)
      }

    )

  }//end login function

  forgotPassword() {
    this.loading = true;
    if (!this.email) {
      this.snackBar.open('Enter your Email', 'Close', { duration: 4000 })
      this.loading = false;
      return
    }
    this.appService.recoverPassword({ email: this.email }).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) this.snackBar.open('Password reset link sent to your email', 'Ok');
        else this.snackBar.open(response.message, 'Close');
        console.log(response);
      },
      error => {
        this.snackBar.open(error.error.message || 'Some  error  occured', 'Close');
        this.loading = false;
        console.log(error)
      }
    )
  }// end forogotPassword

  resetPassword(): any {
    this.loading = true;
    if (!this.password || !this.retypePassword) {
      this.snackBar.open('Enter password', 'Close')
      this.loading = false;
      return
    }
    if (this.password !== this.retypePassword) {
      this.snackBar.open('Passwords do not match', 'Close')
      this.loading = false;
      return
    } else {
      let resetData = {
        password: this.password,
        token: this.resetToken
      }
      this.appService.resetPassword(resetData).subscribe(
        response => {
          this.loading = false;
          if (response.status === 200) {
            console.log(response)
            this.snackBar.open('Password changed sucessfully', 'Close')
          }
          else {
            this.snackBar.open(`${response.message}! This link is expired. Send new password change request.`, 'Close');
            console.log(response)
          }
        },
        error => {
          this.loading = false;
          this.snackBar.open(error.error.message)
          console.log(error)
        }
      )
    }
  }//end resetPassword

}
