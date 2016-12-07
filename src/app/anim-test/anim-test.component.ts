import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-anim-test',
  templateUrl: './anim-test.component.html',
  styleUrls: ['./anim-test.component.css'],
  animations: [
    
    trigger(
      'flyInOut', [
        state('in', style({opacity: 1,transform: 'translateY(0)'})),
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateY(-100%)'
          }),
          animate(400)
        ])
      ]
    )
    
  ]
})
export class AnimTestComponent implements OnInit {

  menu: Array<String> = ["Home", "Product", "Services", "Jobs", "About"]; 

  constructor() { 
    for(let m in this.menu) {
      console.log(this.menu[m]);
    }
  }

  ngOnInit() {
  }

}
