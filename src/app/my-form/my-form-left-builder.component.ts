import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './user.interface';
import { DataManagerService } from './data-manager.service';

@Component({
  selector: 'app-my-form-left-builder',
  templateUrl: './my-form-left-builder.component.html',
  styleUrls: ['./my-form-left-builder.component.css']
})
export class MyFormLeftBuilderComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private ds: DataManagerService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', Validators.required],
      gender: ['']
    });
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    this.ds.addItem(value);
    //console.log(value, valid);
  }

}
