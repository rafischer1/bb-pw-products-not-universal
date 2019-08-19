import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  myform: FormGroup;
  name = new FormControl('');
  price = new FormControl(0);
  creator = new FormControl('');

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myform = new FormGroup({
      name: this.name,
      price: this.price,
      creator: this.creator
    });
  }

  submit(form: any): void {
    let postBody: Product = {
      id: this.generateId(),
      name: this.formatName(this.myform.controls['name'].value),
      price: this.myform.controls['price'].value,
      code: this.generateCode(),
      creator: this.myform.controls['creator'].value,
      last_modified: Math.round(new Date().getTime() / 1000)
    };

    console.log('Form:', postBody);
    this.postProduct(postBody);
  }

  postProduct(postBody: Product) {
    return this.productService.postProduct(postBody);
  }

  formatName = name => {
    let arr = name.split(' ');
    let result = '';
    for (let i = 0; i < arr.length; i++) {
      result += `${arr[i].charAt(0).toUpperCase() + arr[i].slice(1)} `;
    }
    return result;
  };

  generateId = () => {
    return Math.floor(Math.random() * 900);
  };

  generateCode = () => {
    let numbers = `${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}`;
    let a = 'abcdefghijklmnopqrstuvwxyz';

    return `PW${numbers}${a[
      Math.floor(Math.random() * a.length)
    ].toUpperCase()}${a[Math.floor(Math.random() * a.length)].toUpperCase()}`;
  };
}
