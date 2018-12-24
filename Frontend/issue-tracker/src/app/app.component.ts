import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string = "";

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.url = this.router.url;
    });
  }

}
