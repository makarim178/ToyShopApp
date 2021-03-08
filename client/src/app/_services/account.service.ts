import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  
  constructor(private http: HttpClient) { }

  Login(userCred: any) {

    return this.http.post(this.baseUrl + 'account/login', userCred).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          //this.presence.createHubConnection(user);
        }
      })
    )
  }

  Register(userCred: any) {
    return this.http.post(this.baseUrl + 'account/register', userCred).pipe(map((user: User) => {
      if(user) 
      {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
        return user;
      }
    }));
  }

  setCurrentUser(user: User) {
    // user.roles = [];
    // const roles = this.getDecodedToken(user.token).role;
    // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  Logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}