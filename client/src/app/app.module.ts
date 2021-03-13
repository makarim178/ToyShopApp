import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from "ngx-toastr";
import { UserprofileComponent } from './userdash/userprofile/userprofile.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProductListUComponent } from './products/product-list-u/product-list-u.component';
import { ProductCardUComponent } from './products/product-card-u/product-card-u.component';
import { ProductDetailsUComponent } from './products/product-details-u/product-details-u.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { BrandMainAComponent } from './admin/brand/brand-main-a/brand-main-a.component';
import { BrandListAComponent } from './admin/brand/brand-list-a/brand-list-a.component';
import { BrandCrupAComponent } from './admin/brand/brand-crup-a/brand-crup-a.component';
import { CatCrupAComponent } from './admin/category/cat-crup-a/cat-crup-a.component';
import { CatListAComponent } from './admin/category/cat-list-a/cat-list-a.component';
import { CatMainAComponent } from './admin/category/cat-main-a/cat-main-a.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserprofileComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ProductListUComponent,
    ProductCardUComponent,
    ProductDetailsUComponent,
    BrandMainAComponent,
    BrandListAComponent,
    BrandCrupAComponent,
    CatCrupAComponent,
    CatListAComponent,
    CatMainAComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
