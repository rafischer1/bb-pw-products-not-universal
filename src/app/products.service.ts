import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = 'https://backbone-test-api.herokuapp.com/products';
  arr: Product[];
  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.url);
  }

  deleteProduct(id: Number) {
    this.http.delete(`${this.url}/${+id}`).subscribe(
      data => {
        console.log('Delete Request is successful ', data);
        this.router.navigateByUrl(`/`);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  postProduct(postBody: Product) {
    this.http.post(this.url, postBody).subscribe(
      data => {
        this.router.navigateByUrl(`/`);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  putPrice(putBody: Product) {
    this.http.put(`${this.url}/${putBody.id}`, putBody).subscribe(
      data => {
        this.router.navigateByUrl(`/`);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
}
