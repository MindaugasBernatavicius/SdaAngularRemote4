import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor() { }
  getProducts(): IProduct[] {
    return [
      {title: `Shoe A`, count: 150, price: 2.25, rating: 3.5},
      {title: `Shoe B`, count: 200, price: 2.78, rating: 4.33},
      {title: `Shoe-$C`, count: 203, price: 2.7, rating: 2},
      {title: `Shoe-D`, count: 203, price: 2.7, rating: 5},
    ];
  }
}
