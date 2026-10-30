import { Component, signal } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../fashion-apiservice';

type SearchField = 'fashion_subject' | 'fashion_detail';
type SimilarityMetric = 'cosine' | 'jaccard';

@Component({
  selector: 'app-search-fashion',
  standalone: false,
  templateUrl: './search-fashion.html',
  styleUrl: './search-fashion.css',
})
export class SearchFashionComponent {
  results = signal<Fashion[]>([]);
  errorMessage = signal('');
  hasSearched = signal(false);
  query = '';
  field: SearchField = 'fashion_subject';
  metric: SimilarityMetric = 'cosine';
  limit = 12;

  constructor(private readonly service: FashionAPIService) {
    this.loadFashionList();
  }

  private loadFashionList(): void {
    this.errorMessage.set('');
    this.service.getFashions().subscribe({
      next: (data) => this.results.set((data ?? []).slice(0, this.limit)),
      error: (error: Error) => {
        this.results.set([]);
        this.errorMessage.set(`Cannot load fashion list: ${error.message}`);
      },
    });
  }

  search(): void {
    const query = this.query.trim();
    if (!query) {
      this.hasSearched.set(false);
      this.loadFashionList();
      return;
    }

    this.errorMessage.set('');
    this.hasSearched.set(true);
    this.service.searchFashions(query, this.field, this.metric, this.limit).subscribe({
      next: (data) => {
        // Sort by the selected similarity, descending, then cut to the chosen limit
        const sorted = [...(data ?? [])].sort((a, b) => this.similarity(b) - this.similarity(a));
        this.results.set(sorted.slice(0, this.limit));
      },
      error: (error: Error) => {
        this.results.set([]);
        this.errorMessage.set(error.message);
      },
    });
  }

  // Re-run the search when metric / field / limit changes after a search was made
  onOptionChange(): void {
    if (this.hasSearched() && this.query.trim()) {
      this.search();
    }
  }

  similarity(item: Fashion): number {
    const value = this.metric === 'jaccard' ? item.jaccard : item.cosine;
    return Number(value ?? 0);
  }

  scoreClass(item: Fashion): string {
    const score = this.similarity(item);
    return score >= 0.75 ? 'score-high' : score >= 0.5 ? 'score-medium' : 'score-low';
  }

  imageUrl(item: Fashion): string {
    return item.fashion_image || '/images/fashion-street.svg';
  }

  selectId(id: number | undefined): void {
    if (id === undefined) return;
    this.query = String(id);
    this.search();
  }

  slug(item: Fashion): string {
    return item.slug || String(item._id);
  }
}