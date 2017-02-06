import { Component, OnInit } from '@angular/core';
import { Jsonp, URLSearchParams, Http, RequestOptions, Headers, Response } from '@angular/http';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-twittertut',
  templateUrl: './twittertut.component.html',
  styleUrls: ['./twittertut.component.css']
})
export class TwittertutComponent implements OnInit {

  constructor(private service: Http) { }

  private url = 'https://api.github.com/users';

  private responseStream;
  private refreshClickStream;

  ngOnInit() {

    var log = (data) => console.log(data);

    var refreshButton = document.querySelector('.refresh');
    var closeButton1 = document.querySelector('.close1');
    var closeButton2 = document.querySelector('.close2');
    var closeButton3 = document.querySelector('.close3');

    this.refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
    var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
    var close2ClickStream = Rx.Observable.fromEvent(closeButton2, 'click');
    var close3ClickStream = Rx.Observable.fromEvent(closeButton3, 'click');

    var requestStream = this.refreshClickStream.startWith('startup click')
      .map(() => {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https://api.github.com/users?since=' + randomOffset;
      });

    var responseStream = requestStream.flatMap(
      (requestUrl) => {
        return this.service.get(requestUrl);
      }
    );

    //RENDERING

    var x = Rx.Observable.of([{"name": "ivan"},{"name": "dragan"}]);

    close1ClickStream.combineLatest(x, (click, zz) => {
      console.log(click);
      console.log(zz.length);
      return click;
    }).subscribe(log);

    //close1ClickStream.combineLatest(this.responseStream).subscribe(log);
    
    //var suggestion1Stream = this.createSuggestionStream(close1ClickStream);
    //suggestion1Stream.subscribe(log);
  }

  private createSuggestionStream(closeClickStream) {
    return closeClickStream.startWith('startup click')
      .combineLatest(this.responseStream, (click, listUsers) => {
        console.log("listusers " + listUsers);
        return listUsers[Math.floor(Math.random()*listUsers.length)];
      }).merge(this.refreshClickStream.map(() => {return null})).startWith(null);
  }


}
