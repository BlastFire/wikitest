import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import * as Rx from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjst1',
  templateUrl: './rxjst1.component.html',
  styleUrls: ['./rxjst1.component.css']
})
export class Rxjst1Component implements OnInit, AfterViewInit {

  @ViewChild('blaster') blaster: ElementRef;
  @ViewChild('shots') shots: ElementRef;
  @ViewChild('rocks') rocksEl: ElementRef;
  @ViewChild('hits') hits: ElementRef;
  @ViewChild('misses') misses: ElementRef;

  private INTERVAL: number = 20;
  private INITIAL_STATE = {
    rocks: [],
    shots: [],
    blasterPos: 0,
    hits: 0,
    misses: 0
  };
  private PAUSED = false;
  private LETTER_P = 80;

  private timer: Observable<any>;
  private pauser: BehaviorSubject<{}>;
  private pausableTimer: Observable<any>;

  private keydowns: Observable<any>;
  private keyups: Observable<any>;

  private log = (logData) => console.log(logData.login);

  constructor(private rend: Renderer) {
    this.pauser = new Rx.BehaviorSubject(this.PAUSED);
    this.timer = Rx.Observable.interval(this.INTERVAL);
    this.pausableTimer = this.pauser.switchMap(paused => paused ? Rx.Observable.never(): this.timer);
    
    this.keydowns = Rx.Observable.fromEvent(document, 'keydown');
    this.keyups = Rx.Observable.fromEvent(document, 'keyup');

    // Pause Behaviour
    this.keydowns.filter(evt => evt.keyCode === this.LETTER_P).subscribe(() => {this.pauser.next(this.PAUSED = !this.PAUSED)});

    this.pausableTimer.scan(this.updateState, this.INITIAL_STATE).subscribe(this.updateView);

  }

  private updateState(state, time) {
    let { rocks, misses } = state;
    //console.log("misses: " + misses);

    // add rocks
    if (time % 50 === 0) {
      rocks.push({top: 0, left: Math.random() * 870});
    }

    // move rocks
    rocks.forEach(rock => rock.top += 10);

    // remove past rocks

    return Object.assign({}, state, {rocks, misses});
  }

  private updateView(state) {
    console.log(state);
    var htmlData = state.rocks.map(rock => `
    <div class="rock" style="top:${rock.top}.px; left:${rock.left}px"></div>
    `).join('');
    this.rend.setElementProperty(this.rocksEl.nativeElement, 'innerHtml', htmlData);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.rend.setElementStyle(this.blaster.nativeElement, 'background', 'yellow');
  }

}
