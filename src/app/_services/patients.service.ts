import { API_URL } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/';
import { catchError, tap } from 'rxjs/operators';

import { handleError } from '../_services/handleError';

import { Patient } from '../_model/index';


@Injectable()
export class PatientService {

  URL = `${API_URL}api/patients/`;

  constructor(private _http: HttpClient) { }

  getAll (): Observable<any> {
    let url = this.URL;

    return this._http.get(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(handleError(`${this.constructor.name}: get ${url}`))
    );
  }

  get(id: number): Observable<Patient> {
    const url = `${this.URL}${id}/`;
    return this._http.get<Patient>(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(handleError<Patient>(`${this.constructor.name}: get ${url}`))
    );
  }

  save(object: Patient) {
    let url: string;
    const body = object;
    if (object.id === undefined) {
       url = `${this.URL}`;
       return this._http.post(url, body)
       .pipe(
         tap(_ => console.log(`${this.constructor.name}: post ${url} body=${body}`)),
         catchError(handleError(`${this.constructor.name}: post ${url} body=${body}`))
       );
    } else {
       url = `${this.URL}${object.id}/`;
       return this._http.put(url, body)
       .pipe(
         tap(_ => console.log(`${this.constructor.name}: post ${url} body=${body}`)),
         catchError(handleError(`${this.constructor.name}: post ${url} body=${body}`))
       );
    }
  }

  delete(id: number) {
    const url = `${this.URL}${id}/`;
    return this._http.delete(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: delete ${url}`)),
      catchError(handleError(`${this.constructor.name}: delete ${url}`))
    );
  }

}
