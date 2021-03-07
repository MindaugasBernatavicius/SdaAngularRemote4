import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
      <br>
      <router-outlet></router-outlet>
    </div>
    <!--<app-footer></app-footer>-->
  `,
  styles: [ '#app_title { color: red; }' ]
})
export class AppComponent {}
