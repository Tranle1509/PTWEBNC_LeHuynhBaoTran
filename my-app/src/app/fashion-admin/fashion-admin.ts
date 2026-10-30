import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../fashion-apiservice';

@Component({
  selector: 'app-fashion-admin',
  standalone: false,
  templateUrl: './fashion-admin.html',
  styleUrl: './fashion-admin.css',
})
export class FashionAdminComponent {
  fashions = signal<Fashion[]>([]);
  errorMessage = signal('');
  successMessage = signal('');
  editingId = '';
  form: Fashion = this.emptyFashion();

  constructor(
    private readonly service: FashionAPIService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.load();
    if (id) {
      this.service.getFashion(id).subscribe({
        next: (fashion) => { this.editingId = id; this.form = { ...fashion }; },
        error: (error: Error) => this.errorMessage.set(error.message),
      });
    }
  }

  load(): void {
    this.service.getFashions().subscribe({
      next: (fashions) => this.fashions.set(fashions),
      error: (error: Error) => this.errorMessage.set(error.message),
    });
  }

  newFashion(): void {
    this.editingId = '';
    this.form = this.emptyFashion();
    this.router.navigate(['/admin-fashion']);
  }

  edit(fashion: Fashion): void {
    this.editingId = String(fashion._id);
    this.form = { ...fashion };
    this.router.navigate(['/admin-fashion', this.editingId]);
  }

  save(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    const request = this.editingId
      ? this.service.updateFashion(this.editingId, this.form)
      : this.service.createFashion(this.form);
    request.subscribe({
      next: () => {
        this.successMessage.set(this.editingId ? 'Fashion updated successfully.' : 'Fashion added successfully.');
        this.load();
        if (!this.editingId) this.form = this.emptyFashion();
      },
      error: (error: Error) => this.errorMessage.set(error.message),
    });
  }

  remove(fashion: Fashion): void {
    if (!fashion._id || !confirm(`Delete "${fashion.fashion_subject}"?`)) return;
    this.service.deleteFashion(String(fashion._id)).subscribe({
      next: () => { this.successMessage.set('Fashion deleted successfully.'); this.load(); },
      error: (error: Error) => this.errorMessage.set(error.message),
    });
  }

  updateDetail(event: Event): void {
    this.form.fashion_detail = (event.target as HTMLElement).innerHTML;
  }

  private emptyFashion(): Fashion {
    return {
      _id: null,
      style: 'Street style',
      fashion_subject: '',
      fashion_detail: '<p>Describe this look...</p>',
      fashion_image: '',
      creation_date: new Date().toISOString(),
    };
  }
}
