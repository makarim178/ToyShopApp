import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts() {
    if(this.products.length > 0) return of(this.products);
    return this.http.get<Product[]>(this.baseUrl + 'product').pipe(
      map(products => {
        this.products = products;
        return products;
      })
    );
  }

  getProductById(id:any) {
    const product = this.products.find(x => x.id == id);
    if(product !== undefined) return of(product);
    return this.http.get<Product>(this.baseUrl + `product/${id}`);
  }

  getProductBySkn(skn: string){
    const product = this.products.find(x=> x.skn == skn);
    if(product !== undefined) return of(product);
    return this.http.get<Product>(this.baseUrl + `product/skn/${skn}`);
  }

  saveProduct(product) {
    return this.http.post<Product>(this.baseUrl + 'product/addProduct', product);
  }

  updateProduct(product) {
    return this.http.put(this.baseUrl + 'product/product', product).pipe(map(() => {
      const index = this.products.indexOf(product);
      this.products[index] = product;
    }));
  }

  removeProduct(id) {
    return this.http.delete(this.baseUrl + `product/${id}`);
  }

  setMainPhoto(photoUpdate) {
    return this.http.put(this.baseUrl + 'product/set-main-photo', photoUpdate);
  }
  removePhoto(photoId: number, prodId: number) {
    return this.http.delete(this.baseUrl + `product/delete-photo/${photoId}/${prodId}`);
  }
}
