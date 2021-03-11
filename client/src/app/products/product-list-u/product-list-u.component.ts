import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list-u',
  templateUrl: './product-list-u.component.html',
  styleUrls: ['./product-list-u.component.css']
})
export class ProductListUComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }
}
