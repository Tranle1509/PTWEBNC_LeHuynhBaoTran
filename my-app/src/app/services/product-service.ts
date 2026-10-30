import { Injectable } from '@angular/core';
import { Product } from '../classes/iProduct';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products: Product[] = [
    { id: 1, name: "Coca", price: 15, description: "Nước ngọt Coca-Cola", image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-uPKamYgqulaTBoIwft3KpxWZT27fkVtQuJvQen7cUwUGFCRDZtS5sY&s=10" },
    { id: 2, name: "Pepsi", price: 12, description: "Nước ngọt Pepsi", image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQBIxIYvUNDgQoFz9kSPD7NIF39GJHrTni6jUstI1ew&s=10" },
    { id: 3, name: "Sprite", price: 10, description: "Nước ngọt Sprite vị chanh", image_link: "https://bizweb.dktcdn.net/thumb/1024x1024/100/468/889/products/nuoc-ngot-sprite-huong-chanh-320ml.jpg?v=1668050613287" },
    { id: 4, name: "Fanta", price: 13, description: "Nước ngọt Fanta", image_link: "https://t3.ftcdn.net/jpg/04/59/68/76/360_F_459687602_UnQwEflTm1OJqcocV48Ll5zP6hVrPbNc.jpg" },
    { id: 5, name: "7up", price: 11, description: "Nước ngọt 7UP vị chanh", image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMENikxsG69sVQgLShxUuTyZgwEwXBz1EbpTNKMk_ENIxq5cr4XHMZdIc&s=10" }
  ]
  constructor() { }
  getProducts(): Product[] {
    return this.products;
  }
  getProductsWithImages(): Product[] {
    return this.products.map((product) => ({
      ...product,
      ProductId: product.id,
      ProductName: product.name,
      Price: product.price,
      Image: product.image_link,
    }));
  }
  getProductDetail(id: string): Product | undefined {
    return this.products.find((product) => product.id === Number(id));
  }
  filterProductsByPrice(min: number, max: number): Product[] 
  {
    return this.products.filter(p => p.price >= min && p.price <= max);
  }
}