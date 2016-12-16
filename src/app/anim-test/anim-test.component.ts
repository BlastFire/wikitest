import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-anim-test',
  templateUrl: './anim-test.component.html',
  styleUrls: ['./anim-test.component.css'],
  animations: [

    trigger(
      'flyInOut', [
        state('in', style({ opacity: 1, transform: 'translateY(0)' })),
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateY(-100%)'
          }),
          animate(100),
          animate('0.8s 0.1s')
        ])
      ]
    )

  ]
})
export class AnimTestComponent implements OnInit {
  items: String[] = [];
  menu: Array<String> = ["Home", "Product", "Services", "Jobs", "About"];

  constructor() {
  }

  ngOnInit() {
    //this.doNext();
    this.doNext1();
  }

  doNext1() {
  let i = 0, myI = setInterval(() => {
   if(this.items.length == this.menu.length-1) clearInterval(myI);
   this.items.push(this.menu[i]);
   i++;
    }, 500);
  }

  doNext() {
    var menu = this.menu;
    var items = this.items;
    for (var m = 0; m < menu.length; m++) {
      var tim = setTimeout(function(y) {    
        items.push(menu[y])
        if(y >= (menu.length - 1)) {
          clearTimeout(tim);
          console.log('clear')
        }
      }, m*500, m);
    }
  }
}
