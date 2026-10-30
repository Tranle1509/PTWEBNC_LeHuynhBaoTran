import { Component, OnInit, signal } from '@angular/core';
import { FakeProductService } from '../fake-product-service';
import { IFakeProduct } from '../classes/iFakeProtuct';

@Component({
  selector: 'app-fake-product-component',
  standalone: false,
  templateUrl: './fake-product-component.html',
  styleUrl: './fake-product-component.css',
})
export class FakeProductComponent implements OnInit {
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