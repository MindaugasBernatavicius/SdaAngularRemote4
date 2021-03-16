import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-products',
  styles: [
    // 'td { border: 1px solid black; }',
    // 'tbody { font-family: Verdana, Geneva, sans-serif; }'
  ],
  template: `
    <div *ngIf="errorReturned || errorMsg" class="alert alert-danger" role="alert">
      <div>{{ errorMsg }}</div>
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
            <th>Actions</th>
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
            <td>
              <button (click)="onDeleteClicked(product.id)" class="btn btn-outline-danger">Delete</button>
              <a class="btn btn-outline-warning" [routerLink]="['/products', product.id]">Edit</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        {{ ratingClickedMessage }}<br>
        {{ 'Star: ' + starClicked + ' clicked' }}
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-header">Add new product</div>
      <div class="card-body">
        <form class="form-inline" #f="ngForm" (ngSubmit)="onCreateProductSubmit(f)">
          <div class="form-group mb-2">
            <label>Title</label>
            <input name="title" type="text" class="form-control" ngModel>
          </div>
          <div class="form-group mb-2">
            <label>Count</label>
            <input name="count" type="number" class="form-control" ngModel>
          </div>
          <div class="form-group mb-2">
            <label>Price</label>
            <input name="price" type="number" class="form-control" ngModel>
          </div>
          <div class="form-group mb-2">
            <label>Rating</label>
            <input name="rating" type="number" class="form-control" ngModel>
          </div>
          <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </form>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  filteredProducts: IProduct[];
  products: IProduct[];
  ratingClickedMessage: string;
  starClicked: number;
  errorReturned: boolean;
  errorMsg: string;

  constructor(private ps: ProductService, private router: Router) {
    console.log('Products constructor');

    // ... we are using the Safe Navigation Operator / Elvis operator to prevent null derefencing → x?.y
    this.errorMsg = this.router.getCurrentNavigation().extras.state?.error;
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
    // this.products = this.ps.getProducts();
    this.loadProducts();
  }

  loadProducts(): void {
    this.ps.getProducts().subscribe(
      res => {
        // console.log(res);
        this.products = res;
        this.filteredProducts = this.products;
      },
      err => {
        this.errorReturned = true;
        this.errorMsg = err.message;
      }
    );
  }

  onRatingClicked($event: string): void {
    this.ratingClickedMessage = $event;
  }

  onStartClicked($event: number): void {
    this.starClicked = $event;
  }

  onDeleteClicked(id: number): void {
    this.ps.deleteProductById(id).subscribe(
      res => {
        console.log(res);
        this.filteredProducts = this.filteredProducts
          .filter((product: IProduct) => product.id !== id);
      },
      err => {
        this.errorReturned = true;
        this.errorMsg = err.message;
      }
    );
  }

  onCreateProductSubmit(f: NgForm): void {
    // console.log(f.value);
    this.ps.createProduct(f.value).subscribe(
      res => this.loadProducts(),
      err => {
        this.errorReturned = true;
        this.errorMsg = err.message;
      }
    );
  }
}
