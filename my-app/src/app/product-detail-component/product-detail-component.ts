import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../classes/iProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';
import { extractIdFromSlug, getIdentityType } from '../classes/SlugHelper';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  styleUrl: './product-detail-component.css',
  templateUrl: './product-detail-component.html',
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  errMessage = signal("");

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

 ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (param) => {
        let idParam = param.get('id');
        if (idParam != null) {
          const type = getIdentityType(idParam);
          let id: any = -1;
          switch (type) {
            case 'ID':
              // Case where it is a pure number (e.g., product/1)
              id = parseInt(idParam);
              break;
            case 'SLUG_WITH_ID':
              // Case where it is an SEO-friendly Slug (e.g., product/iphone-69-pro-max-p1)
              id = extractIdFromSlug(idParam) ?? -1;
              break;
            case 'PURE_SLUG':
              id = -1;
              break;
          }
          this._service.getProductById(id).subscribe({
            next: (data) => {
              this.product.set(data ?? null);
            },
            error: (err) => {
              this.errMessage.set(err);
            }
          });
        }
      }
    );
  }
  goBack() 
  {
    this.router.navigate(['/products']);
  }
}