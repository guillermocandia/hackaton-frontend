import { API_URL } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/';
import { catchError, tap } from 'rxjs/operators';

import { handleError } from '../_services/handleError';

import { State } from '../_model/index';


@Injectable()
export class StateService {

  URL = `${API_URL}api/states/`;

  constructor(private _http: HttpClient) { }

  getAll (): Observable<any> {
    let url = this.URL;

    return this._http.get(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(handleError(`${this.constructor.name}: get ${url}`))
    );
  }

  get(id: number): Observable<State> {
    const url = `${this.URL}${id}/`;
    return this._http.get<State>(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(handleError<State>(`${this.constructor.name}: get ${url}`))
    );
  }

}
