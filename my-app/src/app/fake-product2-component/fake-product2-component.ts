import { Component, OnInit, signal } from '@angular/core';
import { FakeProductService } from '../fake-product-service';
import { IFakeProduct } from '../classes/iFakeProtuct';

// Ex 27: Interaction External Restful API - Product Service 2
// Dùng lại FakeProductService của Ex 26 (không viết service mới), chỉ đổi giao diện sang dạng card
@Component({
  selector: 'app-fake-product2-component',
  standalone: false,
  templateUrl: './fake-product2-component.html',
  styleUrl: './fake-product2-component.css',
})
export class FakeProduct2Component implements OnInit {
  products = signal<IFakeProduct[]>([]);
  errMessage = signal<string>('');

  constructor(private _service: FakeProductService) {}

  ngOnInit(): void {
    this._service.getFakeProductData().subscribe({
      next: (data: IFakeProduct[]) => {
        this.products.set(data);
      },
      error: (err: unknown) => {
        this.errMessage.set(err instanceof Error ? err.message : 'Unknown error');
      },
    });
  }
}
