import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-palette-module',
  templateUrl: './palette-module.component.html',
  styleUrls: ['./palette-module.component.css']
})
export class PaletteModuleComponent implements OnInit {

  @Output() dmx = new EventEmitter();

  p1Options: { name: string, value: string, selected: boolean}[] = [
    {name: "v0", value: "0", selected: false},
    {name: "v1", value: "1", selected: true}
  ];

  constructor() { }

  ngOnInit() {
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

  onClicked() {
    this.dmx.emit({crown: "1", blake: "2"});
  }


}
