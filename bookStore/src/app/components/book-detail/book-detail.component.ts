import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  getIsbn:any;
  updateForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,
    private crudApi:CrudService){
    this.getIsbn = this.activatedRoute.snapshot.paramMap.get('isbn');
    this.crudApi.getBook(this.getIsbn).subscribe(res=>{
      this.updateForm.setValue({
        isbn:res['isbn'],
        title:res['title'],
        price:res['price'],
        dateOfRelease:res['dateOfRelease']
      })

    })
    this.updateForm = this.formBuilder.group({
      isbn:[''],
      title:[''],
      price:[''],
      dateOfRelease:['']
    })
  }
  ngOnInit(): void {  }
  updateBook(){
    alert("do you want to update?")
    this.crudApi.updateBook(this.getIsbn,this.updateForm.value).subscribe() 
      this.ngZone.run(()=>{this.router.navigateByUrl('/book-list')})
  }

}
