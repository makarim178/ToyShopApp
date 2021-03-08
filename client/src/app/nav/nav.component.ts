import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public accountService: AccountService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  Logout() {
    this.accountService.Logout();
    this.toastr.success('Successfully Logged out!');
    this.route.navigateByUrl('/');
  }

}
