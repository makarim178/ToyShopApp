import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users : any = {};
  model = {
    UserName : "mir",
    Password: "Pa$$w0rd"
  }

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit() {
    //this.GetUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }


  // GetUsers() {
    
  //   this.http.post('https://localhost:5001/api/account/login', this.model)
  //     .subscribe((response) => {
  //       console.log(response);
        
  //       this.users = response;
  //     }, error => console.log(error));
  // }
}
