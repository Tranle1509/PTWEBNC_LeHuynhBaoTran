import { Component } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Product } from '../classes/iProduct';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  styleUrl: './product-list-call-service-component.css',
  templateUrl: './product-list-call-service-component.html',
})
export class ProductListCallServiceComponent {
  min_price:number=0
  max_price:number=10
  products:Product[]=[]
  constructor(private ps:ProductService){
    //this.products = this.ps.getProducts();
  }
  callFilterProductsByPrice(){
    this.products = this.ps.filterProductsByPrice(this.min_price,this.max_price);
  }
  ngOnInit(): void {
    this.products = this.ps.getProducts();
  }
}