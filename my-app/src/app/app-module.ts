import { CurrencyPipe, DatePipe, DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Contact } from './contact/contact';
import { Homework } from './homework/homework';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProduct2Component } from './fake-product2-component/fake-product2-component';
import { BookAPIService } from './book-apiservice/book-apiservice';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { SearchFashionComponent } from './search-fashion/search-fashion';
import { FashionAdminComponent } from './fashion-admin/fashion-admin';

@NgModule({
  declarations: [
    App,
    Contact,
    Homework,
    BindingPropertyComponent,
    BindingClassComponent,
    BindingStyleComponent,
    BindingEventComponent,
    BindingTwoWayComponent,
    ProductListComponent,
    ProductDropdownListComponent,
    ProductListCallServiceComponent,
    ProductListCallHttpServiceComponent,
    ProductHttpHandleErrorServiceComponent,
    ProductDetailComponent,
    ProductListAdvancedComponent,
    ProductListSearchComponent,
    PageNotFoundComponent,
    CourseRegistrationComponent,
    LoginComponent,
    FakeProductComponent,
    CourseRegistrationReactiveComponent,
    FakeProduct2Component,
    BooksComponent,
    BookDetailComponent,
    BookNewComponent,
    BookUpdateComponent,
    BookDeleteComponent,
    FashionComponent,
    FashionDetailComponent,
    SearchFashionComponent,
    FashionAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    TitleCasePipe,
    UpperCasePipe,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App],
})
export class AppModule {}
