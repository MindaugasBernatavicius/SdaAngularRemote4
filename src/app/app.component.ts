import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <h1>{{ greetingMessage }}!!</h1>
    <h3 id="app_title">{{ title }}</h3>
    <app-footer></app-footer>
  `,
  styles: [
    '#app_title { color: red; }'
  ]
})
export class AppComponent {
  title = 'SdaAngularRemote4';
  height = 5;
  greetingMessage = 'Hello word!';
}
