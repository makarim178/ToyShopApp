import { Component, Input, OnInit } from '@angular/core';


import { Product } from 'src/app/_models/product';


@Component({
  selector: 'app-product-card-u',
  templateUrl: './product-card-u.component.html',
  styleUrls: ['./product-card-u.component.css']
})
export class ProductCardUComponent implements OnInit {
  @Input() product: Product;
  noImage = '../../../assets/user.png';

  constructor() { }

  ngOnInit(): void {
    if(this.product.photoUrl) this.noImage=this.product.photoUrl;
  }

}
