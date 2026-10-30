import { Component, signal } from '@angular/core';
import { BookAPIService } from '../book-apiservice/book-apiservice';
import { IBook } from '../classes/Book';

@Component({
  selector: 'app-book-detail-component',
  standalone: false,
  templateUrl: './book-detail-component.html',
  styleUrl: './book-detail-component.css',
})
export class BookDetailComponent {
  book=signal<IBook|null>(null);
  errMessage = signal('');
  server_images_link = '/images';

  constructor(private _service: BookAPIService){
    this.searchBook('b5');
  }

  searchBook(bookId: string): void {
    const id = bookId.trim();
    if (!id) {
      this.book.set(null);
      this.errMessage.set('Please enter a book id');
      return;
    }

    this.book.set(null)
    this.errMessage.set("")
    this._service.getBook(id).subscribe({
      next: (data: IBook) => this.book.set(data),
      error: (err: Error) => this.errMessage.set(err.message),
    })
  }
}


