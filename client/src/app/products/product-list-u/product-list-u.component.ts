import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list-u',
  templateUrl: './product-list-u.component.html',
  styleUrls: ['./product-list-u.component.css']
})
export class ProductListUComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService, private toastr: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  // loadProducts() {
  //   this.productService.getProducts().subscribe(products => {
  //     this.products = products;
  //   })
  // }

  
}
