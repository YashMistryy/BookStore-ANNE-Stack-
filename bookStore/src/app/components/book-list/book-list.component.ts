import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  bookList:any = [];
  constructor(private crudApi:CrudService,private ngZone:NgZone,private router:Router){}
  async ngOnInit(): Promise<void> {
    // alert("are you sure")
    await this.crudApi.getBookList().subscribe(res=>{
      console.log(res);
      this.bookList = res;
    })
  
  }

  deleteBook(isbn:any,index:any){
    console.log(isbn);
    if(window.confirm("do you want to delete isbn:"+isbn)){this.crudApi.deleteBook(isbn).subscribe();
      this.bookList.splice(index,1)}
    }
  }
  

  
  
 