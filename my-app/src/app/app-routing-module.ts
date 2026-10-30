import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { Contact } from './contact/contact';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProduct2Component } from './fake-product2-component/fake-product2-component';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { SearchFashionComponent } from './search-fashion/search-fashion';
import { FashionAdminComponent } from './fashion-admin/fashion-admin';
import { Homework } from './homework/homework';


const routes: Routes = [
  {path: 'app-binding-property-component', component: BindingPropertyComponent},
  {path: 'app-binding-class-component', component: BindingClassComponent},
  {path: 'app-binding-style-component', component: BindingStyleComponent},
  {path: 'app-binding-event-component', component: BindingEventComponent},
  {path: 'app-binding-two-way-component', component: BindingTwoWayComponent},
  {path: 'app-product-list-component', component: ProductListComponent},
  {path: 'app-product-dropdown-list-component', component: ProductDropdownListComponent},
  {path: 'app-product-list-call-service-component', component: ProductListCallServiceComponent},
  {path: 'app-product-list-call-http-service-component', component: ProductListCallHttpServiceComponent},
  {path: 'app-product-http-handle-error-service-component', component: ProductHttpHandleErrorServiceComponent},
  {path: 'app-product-detail-component/:id', component: ProductDetailComponent},
  {path: 'products', component: ProductListAdvancedComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'search-products', component: ProductListSearchComponent, canActivate: [authGuard]},
  {
    path:'samplenested',
    component:ProductListAdvancedComponent,
    children:[
      {path: 'search', component: ProductListSearchComponent},
      {path: 'detail/:id', component: ProductDetailComponent}
    ]
  },

  {path: 'lazyinfor',
    loadComponent: () =>
       import('./lazy-component/lazy-component')
      .then(m => m.LazyComponent),
      canActivate: [authGuard]
  },
  {path:'course-register',component:CourseRegistrationComponent},
  {path:'course-register-reactive',component:CourseRegistrationReactiveComponent},
  {path:'contacts',component:Contact},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'fakeproducts', component: FakeProductComponent},
  {path:'fakeproducts2', component: FakeProduct2Component},
  {path:'book-list', component: BooksComponent},
  {path:'book-detail', component: BookDetailComponent},
  {path:'book-new', component: BookNewComponent},
  {path:'book-update', component: BookUpdateComponent},
  {path:'book-delete', component: BookDeleteComponent},
  {path:'fashion', component: FashionComponent},
  {path:'search-fashion', component: SearchFashionComponent},
  {path:'fashion-detail', component: FashionDetailComponent},
  {path:'fashion-detail/:slug', component: FashionDetailComponent},
  {path:'admin-fashion', component: FashionAdminComponent},
  {path:'admin-fashion/:id', component: FashionAdminComponent},
  {path:'homework', component: Homework},






  {path: '**',component: PageNotFoundComponent},
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }