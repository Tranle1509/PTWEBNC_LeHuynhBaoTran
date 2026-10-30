import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../classes/iProduct';
import { Observable } from 'rxjs/internal/Observable';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';
import id from '@angular/common/locales/extra/id';


@Injectable({
    providedIn: 'root'
})
export class ProductHttpHandleErrorService {
    private _url: string = '/datasets/products.json';
    constructor(private _http: HttpClient) { }
    getProductList(): Observable<Product[]> {
        return this._http.get<Product[]>(this._url)
        .pipe(
              retry(3),
              catchError(this.handleError)
        )
    }
    getProductById(id: number): Observable<Product | undefined> 
{
    return this.getProductList().pipe(
    map((products: Product[]) => products.find(p => p.id === id)),
    catchError(this.handleError)
);
}
    handleError(error:HttpErrorResponse)
    {
        return throwError(()=>new Error(error.message));
    }
}