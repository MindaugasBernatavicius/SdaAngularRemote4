import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  styles: [
    // 'td { border: 1px solid black; }',
    // 'tbody { font-family: Verdana, Geneva, sans-serif; }'
  ],
  template: `
    <div *ngIf="error" class="alert alert-danger" role="alert">
      <div>{{ error }}</div>
    </div>

    <label>Filter:</label>
    <input type="text" (input)="filter($event.target.value)">

    <div class="card">
      <div class="card-header">
        Products table
      </div>
      <div class="card-body">
        <table *ngIf="products && products.length" class="table table-hover">
          <thead>
          <tr>
            <th>Title</th>
            <th>Count</th>
            <th>Price</th>
            <th>Stars</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor='let product of filteredProducts'>
            <td><a [routerLink]="['/products', product.id]">
              {{ product.title | lowercase | converttospace: '-' | converttospace: '$' }}
            </a></td>
            <td>{{ product.count }}</td>
            <td>{{ product.price | currency:'EUR' }}</td>
            <!-- parent -->
            <td><app-star
              [rating]="product.rating"
              (ratingClicked)="onRatingClicked($event)"
              (startClicked)="onStartClicked($event)"
            >
            </app-star></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        {{ ratingClickedMessage }}<br>
        {{ 'Star: ' + starClicked + ' clicked' }}
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  filteredProducts: IProduct[];
  products: IProduct[];
  ratingClickedMessage: string;
  starClicked: number;
  error: string;

  constructor(private ps: ProductService, private router: Router) {
    console.log('Products constructor');

    // ... we are using the Safe Navigation Operator / Elvis operator to prevent null derefencing → x?.y
    this.error = this.router.getCurrentNavigation().extras.state?.error;
  }

  filter(val: any): void {
    this.filteredProducts = val ? this.performFilter(val) : this.products;
  }

  private performFilter(val: any): IProduct[] {
    return this.products.filter((p: IProduct) =>
      p.title.toLocaleLowerCase().indexOf(val) !== -1);
  }

  ngOnInit(): void {
    console.log('Products ngOnInit');
    this.products = this.ps.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingClicked($event: string): void {
    this.ratingClickedMessage = $event;
  }

  onStartClicked($event: number): void {
    this.starClicked = $event;
  }
}
