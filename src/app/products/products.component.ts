import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { ProductService } from '../products.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: Product[];
  clicked: boolean;
  myform: FormGroup;
  name = new FormControl('');
  createPrice = new FormControl('');
  creator = new FormControl('');

  constructor(private productService: ProductService, private router: Router) {}

  getPhoto() {
    return `https://i.warbycdn.com/s/l/25b2081c508fd8bb413a3bfbc6c1657b7de1c6df/2000x1000.jpg?quality=80`;
  }

  ngOnInit() {
    this.getProducts();
    this.createForm();
    this.clicked = false;
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.productList = products as Product[];
    });

    return this.productList;
  }

  togglePrice = function() {
    return this.clicked === true
      ? (this.clicked = false)
      : (this.clicked = true);
  };

  formatDate(date: number) {
    var d = new Date(date * 1000);
    var monthArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    var year = d.getFullYear();
    var month = monthArr[d.getMonth()];
    var date = d.getDate();
    var time = `${month} ${date}, ${year}`;
    return time;
  }

  changePrice(id: number, e: string) {
    this.productList.find(el => el.id === id).price = +e;
    this.productList.find(el => el.id === id).last_modified = Math.round(
      new Date().getTime() / 1000
    );
    this.productService.putPrice(this.productList.find(el => el.id === id));
    return this.togglePrice();
  }

  delete(product: Product) {
    if (confirm(`Delete '${product.name}',  Code: ${product.code}?`)) {
      this.productService.deleteProduct(+product.id);
      this.productList = this.productList.filter(i => i.id !== product.id);
      return this.productList;
    } else {
      return null;
    }
  }

  // -= Create New Product Form Functionality =-
  createForm() {
    this.myform = new FormGroup({
      name: this.name,
      createPrice: this.createPrice,
      creator: this.creator
    });
  }

  submit(): void {
    let postBody: Product = {
      id: this.generateId(),
      name: this.formatName(this.myform.controls['name'].value),
      price: this.myform.controls['createPrice'].value,
      code: this.generateCode(),
      creator: this.myform.controls['creator'].value,
      last_modified: Math.round(new Date().getTime() / 1000)
    };

    this.postProduct(postBody);
  }

  postProduct(postBody: Product) {
    this.productService.postProduct(postBody);
    this.productList.push(postBody);
    return this.clearForm(this.myform);
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
    let id = Math.floor(Math.random() * 900);
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id === id) {
        this.generateId();
      } else {
        return id;
      }
    }
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

  clearForm = (form: any) => form.reset();
}
