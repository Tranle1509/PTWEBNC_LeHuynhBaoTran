import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAPIService } from './book-apiservice';

describe('BookAPIService', () => {
  let component: BookAPIService;
  let fixture: ComponentFixture<BookAPIService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAPIService],
    }).compileComponents();

    fixture = TestBed.createComponent(BookAPIService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
