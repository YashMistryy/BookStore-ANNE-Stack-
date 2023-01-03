import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Book } from './book';
import {catchError,map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  REST_API:string = "http://localhost:9001/books";
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient:HttpClient) { }
// add books - post request
  addBook(data:Book):Observable<any>{
    let  API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError));
  }
    // for deleting book
    deleteBook(isbn:any):Observable<any>{
      let API_URL= `${this.REST_API}/delete-book/${isbn}`;
      console.log("this is the isbn"+isbn);
      return this.httpClient.delete(API_URL,isbn).pipe(catchError(this.handleError));
    }
  // get all books
  getBookList(){
  return this.httpClient.get(`${this.REST_API}/book-list`)
}
// get particular book 
  getBook(isbn:any):Observable<any>{
    let API_URL = `${this.REST_API}/get-book/${isbn}`;
    return this.httpClient.get(API_URL,isbn).pipe(map((res:any)=>{
      return res ||{}
        }),catchError(this.handleError)
    )
  }
  // update book
  updateBook(id:any,data:any):Observable<any>{
    let API_URL= `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }


  // handling Errors
  handleError(error:HttpErrorResponse){
    let errorMsg = '';
    if(error.error instanceof ErrorEvent){
     errorMsg = error.error.message;
    }else{
      errorMsg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMsg);
    return throwError(errorMsg);
  };
  
}
