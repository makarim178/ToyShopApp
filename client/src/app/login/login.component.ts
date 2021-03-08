import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any ={}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  Login() {
    // console.log(this.model);

    this.accountService.Login(this.model).subscribe(response => {
      console.log('You are logged in!');
    });
  }

}
