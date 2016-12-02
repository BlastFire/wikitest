import { Component, OnInit, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-my-hero-detail',
  templateUrl: './my-hero-detail.component.html',
  styleUrls: ['./my-hero-detail.component.css']
})
export class MyHeroDetailComponent implements OnInit {

  constructor() { }

  @Input() hero: Hero;

  ngOnInit() {
  }

}
