import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-left',
  templateUrl: './form-left.component.html',
  styleUrls: ['./form-left.component.css']
})
export class FormLeftComponent implements OnInit {

  constructor() { }

  leftArr: String[] = [];

  onSubmit(form: NgForm) {
    this.leftArr = [];
    for(let i in form.value) {
      this.leftArr.push(form.value[i])
    }
  }

  ngOnInit() {
  }

}
