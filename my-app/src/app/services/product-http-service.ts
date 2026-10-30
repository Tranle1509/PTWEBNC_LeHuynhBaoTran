import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/iProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  private _url: string = "/datasets/products.json";

  constructor(private _http: HttpClient) { }

  getProductsList(): Observable<Product[]> {
    return this._http.get<Product[]>(this._url);
  }
}