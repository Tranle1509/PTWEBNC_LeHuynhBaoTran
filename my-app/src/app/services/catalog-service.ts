import { Injectable } from '@angular/core';
import { Product } from '../classes/iProduct';
import { ProductService } from './product-service';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private productService: ProductService) {}

  getCategories(): Array<{
    Cateid: number;
    CateName: string;
    Products: Product[];
  }> {
    const products = this.productService.getProductsWithImages();
    return [
      {
        Cateid: 1,
        CateName: 'Nước giải khát',
        Products: products,
      },
    ];
  }
}
