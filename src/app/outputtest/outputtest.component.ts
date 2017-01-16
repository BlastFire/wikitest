import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outputtest',
  templateUrl: './outputtest.component.html',
  styleUrls: ['./outputtest.component.css']
})
export class OutputtestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myValChanged(event) {
    console.log(event);
  }

}
