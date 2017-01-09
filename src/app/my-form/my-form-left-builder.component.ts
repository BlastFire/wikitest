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
    //init the form
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', Validators.required],
      gender: ['']
    });

    //populates form with data from transmited object
    this.ds.getData({edit: true}).subscribe((person: User) => {

      //INFO:
      //the object which is returned contains another key: value pair ( id: number ),
      //so using setValue will result error.
      //patchValue instead ignores non matching keys
      //more info https://toddmotto.com/angular-2-form-controls-patch-value-set-value
      this.userForm.patchValue(person);

      console.log(JSON.stringify(person));
    });

  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {

    //1. check if we are in edit mode
    //1.A get the person and see if there is already id key
    //2. update existing record

    let tmpUser: User = this.ds.checkIfUserExists(value);

    if(tmpUser == null) {
      console.log("no user");
    } else {
      this.userForm.invalid = true;
      console.log("yes user: " + this.userForm.invalid);
      
    }

    this.ds.manageItem(value);
    this.userForm.reset();
  }

  crown() {
    return false || this.userForm.invalid;
  }

}
