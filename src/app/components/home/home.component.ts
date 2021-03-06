import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <button (click)="logAndShowMessage($event)" type="button" class="btn btn-primary">{{ buttonMessage }}</button>
    <h1 *ngIf="showMessage">{{ greetingMessage }}!!</h1>
    <br>
    <input type="text" [(ngModel)]='text'>
    <p>{{ text }}</p>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text: string;
  buttonMessage = 'Click me!';
  showMessage = false;
  title = 'SdaAngularRemote4';
  greetingMessage = 'Hello word!';

  constructor() { }
  ngOnInit(): void { }

  logAndShowMessage($event: MouseEvent): void {
    !this.showMessage ? this.showMessage = true : this.showMessage = false;
    console.log($event.screenX);
    console.log('Button clicked!');
  }
}
