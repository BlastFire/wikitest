import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-child',
  templateUrl: './output-child.component.html',
  styleUrls: ['./output-child.component.css']
})
export class OutputChildComponent implements OnInit {

  @Output() pOut = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  triggerEvent() {
    this.pOut.emit({value: "event is received"});
  }

}
