import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {IProduct} from '../../models/IProduct';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product',
  template: `
    <br>
    <div class="card">
      <div class="card-header">
        {{ title }}
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">Product id: <b>{{ product.id }}</b></li>
          <li class="list-group-item">Product title: <b>{{ product.title }}</b></li>
          <li class="list-group-item">Product count: <b>{{ product.count }}</b></li>
          <li class="list-group-item">Product price: <b>{{ product.price }}</b></li>
          <li class="list-group-item">Product rating: <b>{{ product.rating }}</b></li>
        </ul>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary" (click)="onBack()">
          <i class="fa fa-chevron-circle-left"></i> Back
        </button>
      </div>
    </div>

    <br>

    <div class="card">
      <div class="card-header">
        {{ title }}
      </div>
      <div class="card-body">
        <form #updateForm="ngForm" (ngSubmit)="onUpdateProductSubmit(updateForm)">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Product id:</label>
            <div class="col-sm-10">
              <input name="id" ngModel="{{ product.id }}" type="text" readonly class="form-control-plaintext" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Product title:</label>
            <div class="col-sm-10">
              <input name="title" [(ngModel)]="product.title" type="text" class="form-control-plaintext" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Product count:</label>
            <div class="col-sm-10">
              <input name="count" [(ngModel)]="product.count" type="text" class="form-control-plaintext" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Product price:</label>
            <div class="col-sm-10">
              <input name="price" [(ngModel)]="product.price" type="text" class="form-control-plaintext" value="">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Product rating:</label>
            <div class="col-sm-10">
              <input name="rating" [(ngModel)]="product.rating" type="text" class="form-control-plaintext" value="">
            </div>
          </div>
          <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </form>
      </div>
      <div class="card-footer">
        <button class="btn btn-outline-secondary" (click)="onBack()">
          <i class="fa fa-chevron-circle-left"></i> Back
        </button>
      </div>
    </div>

    <br>
    <!--<form action="" method="post">-->
    <!--  <label for="in2">Title</label>-->
    <!--  <input name="title2" type="text" class="form-control" id="in2" required>-->
    <!--  <input type="submit" class="form-control" >-->
    <!--</form>-->
    <form id="myform" #f="ngForm" (ngSubmit)="onSubmit(f)">
      <div class="form-group">
        <label for="in1">Title</label>
        <input name="title" type="text"
               class="form-control" id="in1"
               ngModel #tf="ngModel" required
               [class.field-error]="f.submitted && tf.invalid">
        <!--<div *ngIf="!tf.valid && !tf.untouched" class="alert alert-danger">Please don't leave the value empty</div>-->
        <!--<div [hidden]="!f.submitted || tf.untouched" class="alert alert-danger">-->
        <!--  Please don't leave the value empty-->
        <!--</div>-->
        <div [hidden]="!f.submitted || tf.valid" class="alert alert-danger">
          Please don't leave the value empty
        </div>
        <div [hidden]="!postError" class="alert alert-danger">{{ postErrorMsg }}</div>
      </div>
      <button (click)="mch($event)" type="submit" class="btn btn-primary">Submit</button>
    </form>
    <br>
    f.value  {{ f.value | json }}<br>
    f.valid {{ f.valid | json }}<br>
    f.submitted {{ f.submitted | json }}<br>
    f.touched  {{ f.touched | json }}<br>
    f.dirty {{ f.dirty | json }}<br>
    tf.valid {{ tf.valid | json }}<br>
    <br>
    <br>
  `,
  // styles: [ '.ng-invalid:not(#myform).ng-touched { border: 1px solid red; }' ]
  styles: [' .field-error { border: 1px solid red; }']
})
export class ProductComponent implements OnInit {
  title = `Product`;
  product: IProduct;
  postError: boolean;
  postErrorMsg: string;
  @ViewChild('f') private myForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.title += `: ${id}`;
    // this.product = this.productService.getProductById(id);
    this.productService.getProductById(id).subscribe(
      res => this.product = res,
      err => this.onHttpError(err)
    );
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  mch($event: MouseEvent): void {
    console.log(this.myForm);
  }

  onSubmit(f: NgForm): void {
    this.productService.getProductViaObservable(this.product)
      .subscribe(
        result => console.log(result),
        result => this.onHttpError(result)
      );
  }

  private onHttpError(error: any): void {
    console.log(`Error: `, error);
    this.postError = true;
    this.postErrorMsg = error.message;
  }

  onUpdateProductSubmit(f: NgForm): void {
    this.productService.updateProduct(f.value).subscribe(
      res => console.log(res),
      err => console.log(err),
    );
  }
}
