import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module'
import { UserModule } from './user/user.module'
import { IssueModule } from './issue/issue.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AppService } from "./app.service";
import { ProjectComponent } from './project/project.component'

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1064919328221-7ce00cmar1o5e0bcqccq9seeftl11bma.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("347708909156348")
  }
]);
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    NotFoundComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    LayoutModule,
    SharedModule,
    IssueModule,
    UserModule,
    AngularEditorModule,
    AppRoutingModule
  ],
  providers: [AppService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
