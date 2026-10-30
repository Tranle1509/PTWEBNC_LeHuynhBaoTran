import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Fashion } from './classes/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
    constructor(private _http: HttpClient) { }  
    getFashions(): Observable<Fashion[]> {
      return this._http.get<Fashion[]>('/fashions').pipe(
          retry(3),
          catchError(this.handleError));
    }
    searchFashions(
      query: string,
      field: 'fashion_subject' | 'fashion_detail' = 'fashion_subject',
      metric: 'cosine' | 'jaccard' = 'cosine',
      limit = 12,
    ): Observable<Fashion[]> {
      return this._http.get<Fashion[]>('/fashions/search', {
        params: { q: query, field, metric, limit },
      }).pipe(
        retry(3),
        catchError(this.handleError));
    }
    handleError(error: HttpErrorResponse) {
      const message = error.status === 0 || error.status === 502
        ? 'Fashion API is not running. Start my-server-mongodb with "npm start" and try again.'
        : error.error?.message || error.message;
      return throwError(() => new Error(message));
    }
    getFashion(id: string): Observable<Fashion> {
      const cleanId = id.trim().replace(/^['"]|['"]$/g, '');
      return this._http.get<Fashion>(`/fashions/${encodeURIComponent(cleanId)}`).pipe(
          retry(3),
          catchError(this.handleError));
    }
    createFashion(fashion: Fashion): Observable<Fashion> {
      return this._http.post<Fashion>('/fashions', fashion).pipe(catchError(this.handleError));
    }
    updateFashion(id: string, fashion: Fashion): Observable<Fashion> {
      return this._http.put<Fashion>(`/fashions/${encodeURIComponent(id)}`, fashion).pipe(catchError(this.handleError));
    }
    deleteFashion(id: string): Observable<void> {
      return this._http.delete<void>(`/fashions/${encodeURIComponent(id)}`).pipe(catchError(this.handleError));
    }
}
