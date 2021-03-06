import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imgUrl = 'http://placehold.it/150x50?text=Logo';
  constructor() { }
  ngOnInit(): void {
  }
}
