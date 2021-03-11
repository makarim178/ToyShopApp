import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'product');
  }

  getProductById(id:any) {
    return this.http.get<Product>(this.baseUrl + `product/${id}`);
  }

  getProductBySkn(skn: string){
    return this.http.get<Product>(this.baseUrl + `skn${skn}`);
  }
}
