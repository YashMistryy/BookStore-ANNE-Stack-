import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';

const routes: Routes = [
  {path:'',redirectTo:'/book-list',pathMatch:'full'},
  {path:'book-list',component:BookListComponent},
  {path:'add-book',component:AddBookComponent},
  {path:'edit-book/:isbn',component:BookDetailComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
