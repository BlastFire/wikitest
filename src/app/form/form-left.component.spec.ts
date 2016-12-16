/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormLeftComponent } from './form-left.component';

describe('FormLeftComponent', () => {
  let component: FormLeftComponent;
  let fixture: ComponentFixture<FormLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
