import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog-service';

@Component({
  selector: 'app-exercise14',
  standalone: false,
  templateUrl: './exercise14.html',
  styleUrl: './exercise14.css',
})
export class Exercise14Component implements OnInit {
  categories: any[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.categories = this.catalogService.getCategories();
  }
}
