import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/_services/cart.service';
import { CityService } from 'src/app/_services/city.service';
import { CountryService } from 'src/app/_services/country.service';
import { ProvinceService } from 'src/app/_services/province.service';

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.css']
})
export class CheckoutMainComponent implements OnInit {
  model: any = {};
  cart: any[] = [];
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  selectedDrpDowns = {
    country : 0,
    provice: 0,
    city: 0
  }


  SubTotal = 0;
  shipDis = 0;
  estTax = 0;
  EstTot = 0;

  constructor(public cartService: CartService, private toastr: ToastrService, private cityService: CityService, private provinceService: ProvinceService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.loadDrpDwns();
    this.loadCart();
  }

  loadCart() {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
      this.SubTotal = this.cart.reduce((pre, acc) => pre + (acc.cartQty * acc.productPrice), 0)
      if(this.SubTotal > 35) this.shipDis = 5.99;

      this.estTax = (this.SubTotal * 0.13);
      this.EstTot = (this.SubTotal * 1.13) - this.shipDis;
    })
  }

  loadDrpDwns() {
    if(localStorage.getItem('user')) this.model.id = JSON.parse(localStorage.getItem('user')).id;
    ;
    this.countryService.GetAll().subscribe(countries => this.countries = countries);
    this.provinceService.GetAll().subscribe(provinces => this.provinces = provinces);
    this.cityService.GetAll().subscribe(cities => this.cities = cities);
  }

  onSubmitForm() {
    console.log(this.model);
    
  }



}
