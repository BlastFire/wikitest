import { Component, OnInit, Input, HostListener,
  trigger, state, style, transition, animate } from '@angular/core';
import { DataManagerService } from './data-manager.service';
import { User } from './user.interface';

@Component({
  selector: 'app-form-right',
  templateUrl: './my-form-right.component.html',
  styleUrls: ['./my-form-right.component.css'],
  animations: [
    trigger(
      'flyInOut', [
        state('in', style({ opacity: 1, transform: 'translateY(0)' })),
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateY(+100%)'
          }),
          animate(100),
          animate('0.8s 0.1s')
        ])
      ]
    )
  ]
})
export class MyFormRightComponent implements OnInit {

  personData: User[] = [];

  constructor(private ds: DataManagerService) { }

  // @HostListener('click') onClick() {
  //   console.log("clicked");
  // }

  ngOnInit() {
    this.ds.getData().subscribe((person: User) => {
      this.personData = this.ds.getDataArr();
    });
  }

  crown(e: any) {
    console.log(e);
  }

}
