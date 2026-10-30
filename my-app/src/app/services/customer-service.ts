import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Customer {
  Id: number;
  Name: string;
  Email: string;
  Age: number;
  Image: string;
}

export interface CustomerGroup {
  CustomerTypeId: number;
  CustomerTypeName: string;
  Customers: Customer[];
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  getGroupCustomers(): Observable<CustomerGroup[]> {
    return of([
      {
        CustomerTypeId: 1,
        CustomerTypeName: 'Khach hang thuong',
        Customers: [],
      },
    ]);
  }
}
