import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IBook } from '../classes/Book';

@Injectable({
  providedIn: 'root',
})
export class BookAPIService {
  constructor(private _http: HttpClient) { }
  getBooks(): Observable<IBook[]> {
    return this._http.get<IBook[]>('/books').pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getBook(bookId: string): Observable<IBook> {
    return this._http.get<IBook>(`/books/${bookId}`).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  getBooksByPriceRange(min: number, max: number): Observable<any> {
    const url = `/books/filter/price?min=${min}&max=${max}`;

    return this._http.get<IBook[]>(url).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  postBook(book: IBook & { ImageBase64?: string }): Observable<IBook[]> {
    return this._http.post<IBook[]>('/books', book).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  putBook(book: IBook & { ImageBase64?: string }): Observable<IBook[]> {
    return this._http.put<IBook[]>('/books', book).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  deleteBook(bookId: string): Observable<IBook[]> {
    return this._http.delete<IBook[]>(`/books/${bookId}`).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }
}


