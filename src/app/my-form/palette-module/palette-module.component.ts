import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-palette-module',
  templateUrl: './palette-module.component.html',
  styleUrls: ['./palette-module.component.css']
})
export class PaletteModuleComponent implements OnInit {

  @Output() dmx = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.dmx.emit({crown: "1", blake: "2"});
  }


}
