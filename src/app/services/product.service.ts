import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductService {

  // private products: IProduct[] = [
  //   {id: 1, title: `Shoe A`, count: 150, price: 2.25, rating: 3.5},
  //   {id: 2, title: `Shoe B`, count: 200, price: 2.78, rating: 4.33},
  //   {id: 3, title: `Shoe-$C`, count: 203, price: 2.7, rating: 2},
  //   {id: 4, title: `Shoe-D`, count: 203, price: 2.7, rating: 5},
  // ];

  url = 'http://localhost:9999/api/v1/products';

  constructor(
    private httpClient: HttpClient,
  ) { }

  // getProducts(): IProduct[] {
  //   return this.products;
  // }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.url);
  }

  // getProductById(id: number): IProduct {
  //   let productToReturn: IProduct;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       productToReturn = this.products[i];
  //       break;
  //     }
  //   }
  //   return productToReturn;
  // }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(this.url + '/' + id);
  }

  getProductViaObservable(product: IProduct): Observable<any> {
    console.log('Observable was called!');
    return this.httpClient.post('url', product);
    // return of(product);
  }

  deleteProductById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + id);
  }
}
