import { API_URL } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs/';
import { BehaviorSubject } from 'rxjs/';
import { tap, catchError } from 'rxjs/operators';

import { UserLogin } from '../_model/index';
import { User } from '../_model/index';
import { handleError } from './handleError';

@Injectable()
export class AuthService {
  URL = API_URL;

  LOGIN_URL = `${this.URL}api/users/auth/sign_in/`;
  LOGOUT_URL = `${this.URL}rest-auth/logout/`;
  USER_URL = `${this.URL}rest-auth/user/`;

  private _logged = new BehaviorSubject<boolean>(false);
  logged$ = this._logged.asObservable();

  private user: User;

  private token: string;
  public redirectUrl = '/';

  constructor(private _http: HttpClient,
              private _router: Router) { }


  public get logged(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token !== null) {
      this._logged.next(true);
    } else {
      this._logged.next(false);
    }
    return this._logged.getValue();
  }

  public set logged(value: boolean) {
    if (value === false) {
      localStorage.removeItem('token');
      this._logged.next(false);
    } else {
      this.token = localStorage.getItem('token');
      this._logged.next(true);
    }
  }


  getToken () {
    return this.token;
  }


  login(arg0: UserLogin|string, arg1?: string): any {
    const url = this.LOGIN_URL;
    let body: any;
    if (arg1 === undefined && (arg0 instanceof UserLogin)) {
      body = arg0;
    } else {
      body = {username: arg0, password: arg1};
    }

    return this._http.post<any>(url, body)
    .pipe(
        tap((data: any) => {
          console.log(`${this.constructor.name}: post ${url}`);
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            this.logged = true;
            this._router.navigate([this.redirectUrl]);
          }
        }),
        catchError(handleError<string>(`${this.constructor.name}: post ${url}`))
      );
    }


    logout() {
      const url = this.LOGOUT_URL;

      const headers = new HttpHeaders({ 'Authorization': 'JWT ' + this.token });
      localStorage.removeItem('token');
      this.token = undefined;
      this._http.get(url, { headers })
        .subscribe(
           function(_) {
             location.href = '/login';
           }, _ => {
             location.href = '/login';
           }
        );
    }

    getUser() {
      return this.user;
    }

  }
