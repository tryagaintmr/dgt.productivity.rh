import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {
    // initialize AD FS authentification through ADAL.JS

  }

  navigateToCrud() {
    this.router.navigateByUrl('crud');
  }
}
