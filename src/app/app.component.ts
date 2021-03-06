import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- component as directive -->
    <app-header></app-header>
    <app-products></app-products>
    <app-footer></app-footer>
  `,
  styles: [ '#app_title { color: red; }' ]
})
export class AppComponent {}
