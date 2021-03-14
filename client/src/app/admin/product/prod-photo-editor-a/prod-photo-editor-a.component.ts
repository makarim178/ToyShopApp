
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/_models/product';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prod-photo-editor-a',
  templateUrl: './prod-photo-editor-a.component.html',
  styleUrls: ['./prod-photo-editor-a.component.css']
})
export class ProdPhotoEditorAComponent implements OnInit {

  @Input() product: Product;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private productService: ProductService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + `product/add-photo/${this.product.id}`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem =(item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.product.photos.push(photo);
      }
    }
  }

  setMainPhoto(photo) {
    this.productService.setMainPhoto({"ProductId": this.product.id, "PhotoId": photo.id}).subscribe(() => {
      this.product.photoUrl = photo.url;
      this.product.photos.forEach(p => {
        
        if(p.isMain) {
          p.isMain = false;
        }
        
        if(p.id === photo.id) p.isMain = true;
      })
      //console.log(this.product.photos);
      this.toastr.success("Main Photo Updated!");
    })
  }

  removePhoto(photoId: number) {
    this.productService.removePhoto(photoId, this.product.id).subscribe(() => {
      this.product.photos = this.product.photos.filter(x => x.id !== photoId);
      this.toastr.success("Successfully removed photo!");
    })
  }



}
