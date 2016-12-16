/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormRightComponent } from './form-right.component';

describe('FormRightComponent', () => {
  let component: FormRightComponent;
  let fixture: ComponentFixture<FormRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
