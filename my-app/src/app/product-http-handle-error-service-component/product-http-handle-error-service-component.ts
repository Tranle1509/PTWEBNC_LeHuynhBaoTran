import { Component, signal } from '@angular/core';
import { Product } from '../classes/iProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service/product-http-handle-error-service';

@Component({
  selector: 'app-product-http-handle-error-service-component',
  standalone: false,
  templateUrl: './product-http-handle-error-service-component.html',
  styleUrl: './product-http-handle-error-service-component.css',
})
export class ProductHttpHandleErrorServiceComponent {
  products = signal<Product[]>([]);
  errMessage = signal('');

  constructor(private service: ProductHttpHandleErrorService) {}

  ngOnInit(): void {
    this.service.getProductList().subscribe({
      next: (products) => this.products.set(products),
      error: (error: Error) => this.errMessage.set(error.message),
    });
  }
}