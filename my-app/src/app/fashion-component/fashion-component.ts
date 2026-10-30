import { Component, signal } from '@angular/core';
import { FashionAPIService } from '../fashion-apiservice';
import { Fashion } from '../classes/Fashion';

@Component({
  selector: 'app-fashion-component',
  standalone: false,
  templateUrl: './fashion-component.html',
  styleUrl: './fashion-component.css',
})
export class FashionComponent {
  fashions = signal<Fashion[]>([]);
  errMessage = signal('');
  query = '';
  searched = false;

  constructor(private readonly service: FashionAPIService) {
    this.service.getFashions().subscribe({
      next: (data) => this.fashions.set(data),
      error: (error: Error) => this.errMessage.set(error.message),
    });
  }

  search(): void {
    const query = this.query.trim();
    if (!query) {
      this.searched = false;
      this.loadAll();
      return;
    }

    this.searched = true;
    this.errMessage.set('');
    this.service.searchFashions(query).subscribe({
      next: (data) => this.fashions.set(data),
      error: (error: Error) => {
        this.fashions.set([]);
        this.errMessage.set(error.message);
      },
    });
  }

  private loadAll(): void {
    this.service.getFashions().subscribe({
      next: (data) => this.fashions.set(data),
      error: (error: Error) => this.errMessage.set(error.message),
    });
  }
}
