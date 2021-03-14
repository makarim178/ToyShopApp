import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/_services/brand.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-prod-main-a',
  templateUrl: './prod-main-a.component.html',
  styleUrls: ['./prod-main-a.component.css']
})
export class ProdMainAComponent implements OnInit {

  searchType = 0;
  selectedOption = 0;
  skn="";
  loadSkn = false;
  loadOptions : any [] = [];
  productList: any [] = [];

  constructor(private brandService:BrandService, private categoryService: CategoryService
      , private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProductList();
  }

  onChangeSearchType(event) {
    this.loadOptions=[];
    if(event == 1 || event == "1") {
      this.loadSkn = true;
    } else {
      this.loadSkn = false;
      if(event == 2 || event == "2") this.loadBrand();
      if(event == 3 || event == "3") this.loadCategory();
    }
  }

  loadBrand() {
    this.brandService.GetAllBrands().subscribe(brands => {
      this.loadOptions = brands;
    })
  }

  loadCategory() {
    this.categoryService.GetAll().subscribe(categories => {
      this.loadOptions = categories;
    })
  }

  Search() {

  }

  loadProductList() {
    if(this.searchType == 0) {
      this.productService.getProducts().subscribe(products => {
        this.productList = products;
      })
    }

    if(this.searchType == 1) {
      this.productService.getProductBySkn(this.skn).subscribe(product => {
        // console.log(product);
        const searchProd = [];
        searchProd.push(product);
        this.productList = searchProd;
      })
    }
  }

  removeProduct(id) {
    this.productService.removeProduct(id).subscribe(response => {
      this.toastr.success("Successfully removed!");
      this.loadProductList();
    })
  }

}
