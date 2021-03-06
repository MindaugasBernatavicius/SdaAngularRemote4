import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  styles: [
    // 'td { border: 1px solid black; }',
    // 'tbody { font-family: Verdana, Geneva, sans-serif; }'
  ],
  template: `
    <label>Filter:</label>
    <input type="text" (input)="filter($event.target.value)">

    <h1>Products table:</h1>
    <table *ngIf="products && products.length" class="table">
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
        <td>{{ product.title | lowercase | converttospace: '-' | converttospace: '$' }}</td>
        <td>{{ product.count }}</td>
        <td>{{ product.price | currency:'EUR' }}</td>
        <td><app-star
          [rating]="product.rating"
          (ratingClicked)="onRatingClicked($event)"
          (startClicked)="onStartClicked($event)"
        >
        </app-star></td>
      </tr>
      </tbody>
    </table>
    {{ ratingClickedMessage }}<br>
    {{ 'Star: ' + starClicked + ' clicked' }}
  `
})
export class ProductsComponent implements OnInit {
  filteredProducts: IProduct[];
  products: IProduct[];
  ratingClickedMessage: string;
  starClicked: number;
  private productService: ProductService;

  filter(val: any): void {
    this.filteredProducts = val ? this.performFilter(val) : this.products;
  }

  private performFilter(val: any): IProduct[] {
    return this.products.filter((p: IProduct) =>
      p.title.toLocaleLowerCase().indexOf(val) !== -1);
  }

  constructor(productService: ProductService) {
    this.productService = productService;
    console.log('Products constructor');
  }

  ngOnInit(): void {
    console.log('Products ngOnInit');
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingClicked($event: string): void {
    this.ratingClickedMessage = $event;
  }

  onStartClicked($event: number): void {
    this.starClicked = $event;
  }
}
