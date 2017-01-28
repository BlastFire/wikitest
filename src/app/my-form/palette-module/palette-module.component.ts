import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface VSelectModel {
  name: string,
  value: string,
  selected: boolean
}

@Component({
  selector: 'app-palette-module',
  templateUrl: './palette-module.component.html',
  styleUrls: ['./palette-module.component.css']
})
export class PaletteModuleComponent implements OnInit {

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

          // if (optionElement.selected == true) { optionModel.selected = true; }
          // else { optionModel.selected = false; }
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
    }
  }

  leftArrowDisabled() {
    return this.p2Options.length == 0;
  }

  rightArrowDisabled() {
    return this.p1Options.length == 0;
  }

  onClicked() {
    this.dmx.emit({crown: "1", blake: "2"});
  }


}
