import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface VSelectModel {
  name: string,
  value: string,
  selected: boolean
}

@Component({
  selector: 'app-palette-module',
  templateUrl: './palette-module.component.html',
  styleUrls: ['./palette-module.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaletteModuleComponent),
      multi: true,
    }
  ]
})
export class PaletteModuleComponent implements OnInit, ControlValueAccessor  {

  @Output() dmx = new EventEmitter();

  p1Options: VSelectModel[];

  p2Options: VSelectModel[];

  constructor() { }

  ngOnInit() {
    this.p1Options = [
       {name: "v0", value: "0", selected: false},
       {name: "v1", value: "1", selected: false}
    ];

    this.p2Options = [
       {name: "z0", value: "0", selected: false},
       {name: "z1", value: "1", selected: false}
    ];
    console.log("init");
  }

  setSelectedP1(selectElement) {
      for (let i = 0; i < selectElement.options.length; i++) {
          let optionElement = selectElement.options[i];
          let optionModel = this.p1Options[i];
          optionModel.selected = optionElement.selected;
      }

      console.log(this.p1Options);
  }

  setSelectedP2(selectElement) {
      for (let i = 0; i < selectElement.options.length; i++) {
          let optionElement = selectElement.options[i];
          let optionModel = this.p2Options[i];
          optionModel.selected = optionElement.selected;
      }

      console.log(this.p2Options);
  }  

  leftArrow() {
    if(this.p2Options.length != 0) {
      this.p2Options = this.p2Options.filter((obj: VSelectModel) => {
        if(obj.selected === true) {
          obj.selected = false;
          this.p1Options.push(obj);
          return false;
        }
        return true;
      });
      this.propagateChange(JSON.stringify(this.p2Options));
    }
  }

  rightArrow() {
    if(this.p1Options.length != 0) {
      this.p1Options = this.p1Options.filter((obj: VSelectModel) => {
        if(obj.selected === true) {
          obj.selected = false;
          this.p2Options.push(obj);
          return false;
        }
        return true;
      });

      this.propagateChange(JSON.stringify(this.p2Options));
    }
  }

  leftArrowDisabled() {
    return this.p2Options.length == 0;
  }

  rightArrowDisabled() {
    return this.p1Options.length == 0;
  }

  // onClicked() {
  //   this.dmx.emit({crown: "1", blake: "2"});
  // }

  // the method set in registerOnChange, it is just 
  // a placeholder for a method that takes one parameter, 
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => { };

  //init value
  public writeValue(obj: any) {
  }

  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
      console.log("in register on change " + fn);
      this.propagateChange = fn;
      this.propagateChange(JSON.stringify(this.p2Options)); 
  }
  // not used, used for touch input
  public registerOnTouched() { }


}
