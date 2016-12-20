import { Component, OnInit, Input, trigger, state, style, transition, animate, DoCheck } from '@angular/core';
declare var $;

@Component({
  selector: 'app-form-right',
  templateUrl: './form-right.component.html',
  styleUrls: ['./form-right.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateY(0)'})),
    transition('void => *', [
      style({transform: 'translateY(-100%)'}),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateY(100%)'}))
    ])
  ])
]
})
export class FormRightComponent implements OnInit, DoCheck {

  rightArr: String[] = [];
  changeDetected = false;

  constructor() { }

  animate() {
    this.rightArr = [];
    let i = 0, myI = setInterval(() => {
      if(this.leftArr.length == this.rightArr.length + 1) clearInterval(myI);
      this.rightArr.push(this.leftArr[i]);
      i++;
    }, 500);
  }

  ngOnInit() {
    var animateButton = document.getElementById('animate-button');
    animateButton.setAttribute('disabled', 'true');
  }

  ngDoCheck() {
    if(this.leftArr.length !== 0) {
      this.changeDetected = true;
    }
    if(this.changeDetected) {
      var animateButton = document.getElementById('animate-button');
      animateButton.removeAttribute('disabled');
    }
  }

  @Input() leftArr: String[];
}
