import { Observable, of } from 'rxjs';

export function handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
