import { Component, signal } from '@angular/core';
import { BookAPIService } from '../book-apiservice/book-apiservice';
import { IBook } from '../classes/Book';

@Component({
  selector: 'app-books-component',
  standalone: false,
  templateUrl: './books-component.html',
  styleUrl: './books-component.css',
})
export class BooksComponent {
  books=signal<IBook[]>([]);
  errMessage=signal('')
  server_images_link = '/images';
  constructor(private _service: BookAPIService){
    this._service.getBooks().subscribe({
      next: (data: IBook[]) => this.books.set(data),
      error: (err: Error) => this.errMessage.set(err.message)
    })
  }
}


