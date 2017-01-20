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

          if (optionElement.selected == true) { optionModel.selected = true; }
          else { optionModel.selected = false; }
      }

      console.log(this.p1Options);
  }

  setSelectedP2(selectElement) {
      for (let i = 0; i < selectElement.options.length; i++) {
          let optionElement = selectElement.options[i];
          let optionModel = this.p2Options[i];

          if (optionElement.selected == true) { optionModel.selected = true; }
          else { optionModel.selected = false; }
      }

      console.log(this.p2Options);
  }  

  leftArrow() {

  }

  rightArrow() {
    //1.vzemi vsichko ot left .. filtrirai po selected i tezi za koito e true gi prehvyrli v dqsnoto.
    //2. iztrii ot lqvoto prehvyrlenite
    if(this.p1Options.keys.length != 0) {
      this.p1Options = this.p1Options.filter((obj: VSelectModel) => {
        
      });
    }
  }

  onClicked() {
    this.dmx.emit({crown: "1", blake: "2"});
  }


}
