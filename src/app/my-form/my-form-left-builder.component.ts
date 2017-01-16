import { Component, OnInit, OnChanges, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.interface';
import { DataManagerService } from './data-manager.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-my-form-left-builder',
  templateUrl: './my-form-left-builder.component.html',
  styleUrls: ['./my-form-left-builder.component.css']
})

export class MyFormLeftBuilderComponent implements OnInit {

  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 10 characters long.'
    },
    'email': {
      'required': 'Email is required.',
      'pattern' : 'Email is not in the right format',
      'duplicateEmail': 'There is already user with that email in the system.'
    }
    
  }

  userForm: FormGroup;
  private person: User;

  constructor(private fb: FormBuilder, private ds: DataManagerService, private zone:NgZone) { }

  ngOnInit() {
    //init the form
    this.buildForm();

    //populates form with data from transmited object
    this.ds.getData({edit: true}).subscribe((person: User) => {

      //INFO:
      //the object which is returned contains another key: value pair ( id: number ),
      //so using setValue will result error.
      //patchValue instead ignores non matching keys
      //more info https://toddmotto.com/angular-2-form-controls-patch-value-set-value
      this.userForm.patchValue(person);

      //set person so we can delete it
      this.person = person;

      //this.zone.run(() => console.log("time travel"));

    });

    //this.userForm.valueChanges.subscribe(data => console.log(data));

    //Checking the status of the form
    //this.userForm.statusChanges.subscribe(data => console.log(data));
  }

  buildForm(): void {
   this.userForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      lastname: [''],
      email: ['', Validators.compose([Validators.required,
        Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"),
        this.duplicateEmailValidator.bind(this)])
      ],
      //date: ''
      //mysel: [this.themes[0]],
    });

    //subscribes to value changes from inputs
    this.userForm.valueChanges.subscribe(data => this.formValueChanged(data));
    

    //reset validation messages
    this.formValueChanged(); 

  }

  formValueChanged(data?: any) {

    //console.log(JSON.stringify(this.userForm.value));

    //console.log(this.userForm.get('email').errors);
    if(!this.userForm) { return; }
    const form = this.userForm;

    for(const field in this.formErrors) {
      //clear prev error msg if any
      this.formErrors[field] = '';
      const control = form.get(field);

      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          //console.log(control.errors);
          this.formErrors[field] += messages[key] + ' ';
        }
      }

    }
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    //TODO
    //1. check if we are in edit mode
    //1.A get the person and see if there is already id key
    //2. update existing record

    this.ds.manageItem(value);
    this.userForm.reset();
  }

  delete() {
    //person object is filled in edit mode ( we can only delete in edit mode )
    if(this.person) {
      this.ds.deleteRecord(this.person);
      //clearing the tmp var
      this.clearingTmpLocalVar();
      this.userForm.reset();
    }
  }

  showDelete() {
    //console.log(this.isEmptyObject(this.person));
    return this.isEmptyObject(this.person);
  }

  isEmptyObject(obj) {
    if(obj != null) {
      return !(Object.keys(obj).length === 0);
    }
    return false;
  } 

  clearingTmpLocalVar() {
    this.person = null;
  } 
  
  /* VALIDATORS */ 

  duplicateEmailValidator(control: FormControl): {[s: string]: boolean} {
    if(this.ds.checkIfEmailAlreadyExists(control.value) != null) return({'duplicateEmail': true});
    return(null);
  }

  myValueChanged(event) {
    console.log("my new component: " + JSON.stringify(event));
  }

  //FUCKTHAT
  // asyncDuplicateFirstNameValidator(control: FormControl): Promise<any> | Observable<any> {

  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       setTimeout(() => {
  //         let tmpUser: User = this.ds.checkIfFirstNameExists(control.value);
  //         if(tmpUser != null) {
  //             console.log("test");
  //           resolve({'invalid': true});
  //         }
  //         console.log("ok");
  //         //if(tmpUser != null) resolve({'invalid': true});
  //         resolve(null);
  //       }, 1500);
  //     }
  //   );
    
  // }


}
