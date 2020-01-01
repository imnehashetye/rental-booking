import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
const jwt = new JwtHelperService();

@Injectable()
export class AuthService {
private decodedToken = JSON.parse(localStorage.getItem('userData')) || {};
public : boolean = false;

  constructor(private http: HttpClient) {}

  private saveToken(token: any) {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(this.decodedToken));

    return token;
  }

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/user', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/user/auth', userData).map(
      (token) => (this.saveToken(token)));
  }

  public isAuthenticated(flag): any {
   const isAuthenticatedUser = moment().isBefore(moment.unix(this.decodedToken.exp));
   if (!flag) return isAuthenticatedUser;

   const obj = { isAuthenticatedUser };
  
   if (isAuthenticatedUser) {
     Object.assign(obj, { username: this.decodedToken.username });
   }
   return obj;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.clear();
    this.decodedToken = {};
  }
}