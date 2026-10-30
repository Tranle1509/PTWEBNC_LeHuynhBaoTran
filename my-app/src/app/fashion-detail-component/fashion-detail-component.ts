import { ActivatedRoute } from '@angular/router';
import { Component, signal } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../fashion-apiservice';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent {
  fashion=signal<Fashion|null>(null);
  errMessage=signal('')
  constructor(
    private readonly service: FashionAPIService,
    route: ActivatedRoute,
  ) {
    route.paramMap.pipe(
      switchMap((params) => {
        const slug = params.get('slug');
        if (!slug) {
          this.errMessage.set('Fashion slug is missing.');
          this.fashion.set(null);
        }
        return slug ? this.service.getFashion(slug) : of(null);
      }),
    ).subscribe({
      next: (data) => {
        if (data) this.fashion.set(data);
      },
      error: (error: Error) => {
        this.fashion.set(null);
        this.errMessage.set(error.message);
      },
    });
  }

  searchFashion(id: string) {
    const fashionId = id.trim().replace(/^['"]|['"]$/g, '');
    if (!fashionId) {
      this.errMessage.set('Please enter a Fashion Id.');
      this.fashion.set(null);
      return;
    }

    this.fashion.set(null);
    this.errMessage.set('');
    this.service.getFashion(fashionId).subscribe({
      next: (data) => this.fashion.set(data),
      error: (error: Error) => this.errMessage.set(error.message),
    });
  }
}