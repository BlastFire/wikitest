import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataManagerService } from './data-manager.service';
import { Person } from './person';

@Component({
  selector: 'app-form-left',
  templateUrl: './my-form-left.component.html',
  styleUrls: ['./my-form-left.component.css']
})
export class MyFormLeftComponent implements OnInit {

  constructor(private ds: DataManagerService) { }

  onSubmit(form: NgForm) {
    this.ds.addItem(new Person(form.value.firstname, form.value.lastname, form.value.email, form.value.gender));
    form.reset();
  }

  ngOnInit() {
  }

}
