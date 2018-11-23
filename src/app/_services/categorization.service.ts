import { API_URL } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/';
import { catchError, tap } from 'rxjs/operators';

import { handleError } from '../_services/handleError';

import { Categorization } from '../_model/index';


@Injectable()
export class CategorizationService {

  URL = `${API_URL}api/categorizations/`;

  constructor(private _http: HttpClient) { }

  getAll (): Observable<any> {
    let url = this.URL;

    return this._http.get(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(handleError(`${this.constructor.name}: get ${url}`))
    );
  }

  get(id: number): Observable<Categorization> {
    const url = `${this.URL}${id}/`;
    return this._http.get<Categorization>(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(handleError<Categorization>(`${this.constructor.name}: get ${url}`))
    );
  }

}
