import { Component, OnInit, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface VSelectModel {
  name: string,
  value: string
}

export interface PalleteDataWrapper {
  model:VSelectModel,
  selected: boolean;
}

export interface ModelControl {
   getAllData<T extends PalleteDataWrapper>(obj: T): T;
   getSelectedData<T extends PaletteModuleComponent>(obj: T): T;
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
export class PaletteModuleComponent implements OnInit, ControlValueAccessor, ModelControl {

  @Input() formatted: boolean = false;

  allAvailData: PalleteDataWrapper[];
  selectedData: PalleteDataWrapper[];

  constructor() { }

  getAllData() {
    return this.allAvailData;
  }

  getSelectedData() {
    return this.selectedData;
  }

  ngOnInit() {

    var a = {name:"b1", value: "0", bla: "bla"};

    this.allAvailData = [
      {
      model: a,
      selected: false
      },
      {
      model: {name: "v1", value: "1"},
      selected: false
      }
    ];

    this.selectedData = [
      {
      model: {name: "z0", value: "0"},
      selected: false
      },
      {
      model: {name: "z1", value: "1"},
      selected: false
      }
    ];

  }

  setSelectedP1(selectElement) {
      for (let i = 0; i < selectElement.options.length; i++) {
          this.allAvailData[i].selected = selectElement.options[i].selected
      }
  }

  setSelectedP2(selectElement) {
      for (let i = 0; i < selectElement.options.length; i++) {
          this.selectedData[i].selected = selectElement.options[i].selected
      }
  }  

  removeFromSelected() {
    if(this.selectedData.length != 0) {
      this.selectedData = this.selectedData.filter((obj: PalleteDataWrapper) => {
        if(obj.selected === true) {
          obj.selected = false;
          this.allAvailData.push(obj);
          return false;
        }
        return true;
      });
      this.transmutateJson(this.selectedData);
    }
  }

  addToSelected() {
    if(this.allAvailData.length != 0) {
      this.allAvailData = this.allAvailData.filter((obj: PalleteDataWrapper) => {
        if(obj.selected === true) {
          obj.selected = false;
          this.selectedData.push(obj);
          return false;
        }
        return true;
      });
      this.transmutateJson(this.selectedData);
    }
  }

  removeFromSelectedButtonDisabled() {
    return this.selectedData.length == 0;
  }

  addToSelectedButtonDisabled() {
    return this.allAvailData.length == 0;
  }

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
      this.propagateChange = fn;
      this.transmutateJson(this.selectedData);
  }
  // not used, used for touch input
  public registerOnTouched() { }

  /**
   * Helper method for formatting data to json if input property provided
   */
  private transmutateJson(obj: PalleteDataWrapper[]):void {
    if(this.formatted) {
      this.propagateChange(JSON.stringify(obj));
    } else {
      this.propagateChange(obj);
    }
  }


}
