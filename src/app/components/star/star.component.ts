import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star',
  template: `
    <div class="crop"
         [style.width.px]="starWidth"
         [title]="rating"
         (click)="OnRatingClicked()"
    >
      <div style="width: 75px">
        <span (click)="OnStarClicked(1)" class="fa fa-star"></span>
        <span (click)="OnStarClicked(2)" class="fa fa-star"></span>
        <span (click)="OnStarClicked(3)" class="fa fa-star"></span>
        <span (click)="OnStarClicked(4)" class="fa fa-star"></span>
        <span (click)="OnStarClicked(5)" class="fa fa-star"></span>
      </div>
    </div>
  `,
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() rating: number;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() startClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }
  ngOnInit(): void {
    this.starWidth = this.rating * 75 / 5;
  }

  OnRatingClicked(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }

  OnStarClicked(num: number): void {
    // console.log(num);
    this.startClicked.emit(num);
  }
}
