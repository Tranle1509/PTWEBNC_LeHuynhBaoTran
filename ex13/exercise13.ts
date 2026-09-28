import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-exercise13',
  standalone: false,
  templateUrl: './exercise13.html',
  styleUrl: './exercise13.css',
})
export class Exercise13Component implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(
    private pservice: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.pservice.getProductsWithImages();

    // Hỗ trợ nhận id khi định tuyến có param: /exercise13/:id
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.selectedProduct = this.pservice.getProductDetail(id);
      }
    });
  }

  viewDetail(p: any): void {
    this.selectedProduct = p;
  }

  goBack(): void {
    this.selectedProduct = null;
  }
}
