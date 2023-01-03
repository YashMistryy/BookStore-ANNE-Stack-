import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,
    private ngZone:NgZone,private crudApi:CrudService) {

      this.bookForm = this.formBuilder.group({
        title:[''],price:[''],isbn:[''],dateOfRelease:['']
      })
    }
  
  ngOnInit(): void {
   
  }
  onSubmit():any{
    this.crudApi.addBook(this.bookForm.value)
    .subscribe();
    this.ngZone.run(()=>this.router.navigateByUrl(''))
    // this.router.navigate(['']);

   }

}
