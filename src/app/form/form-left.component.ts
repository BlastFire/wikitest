import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-left',
  templateUrl: './form-left.component.html',
  styleUrls: ['./form-left.component.css']
})
export class FormLeftComponent implements OnInit {

  constructor() { }

  onSubmit(form: NgForm) {
    console.log(form.value)
    console.log('asd')
  }

  ngOnInit() {
  }

}
