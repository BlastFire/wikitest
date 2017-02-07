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

    var log = (data) => console.log(data.login);

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

    this.responseStream = requestStream.flatMap(
      (requestUrl) => {
        return this.service.get(requestUrl);
      }
    );

    //BINDING
    var suggestion1Stream = this.createSuggestionStream(close1ClickStream);
    var suggestion2Stream = this.createSuggestionStream(close2ClickStream);
    var suggestion3Stream = this.createSuggestionStream(close3ClickStream);

    //RENDERING
    suggestion1Stream.subscribe((user) => {
      this.renderSuggestion(user, '.suggestion1');
    });
    suggestion2Stream.subscribe((user) => {
      this.renderSuggestion(user, '.suggestion2');
    });
    suggestion3Stream.subscribe((user) => {
      this.renderSuggestion(user, '.suggestion3');
    });

  }

  private renderSuggestion(user: any, selector: string) {
    var suggestionElement= <HTMLElement>document.querySelector(selector);
    if (user === null) {
      suggestionElement.style.visibility = 'hidden';
    } else {
      suggestionElement.style.visibility = 'visible';
      var userNameElement = <HTMLAnchorElement>suggestionElement.querySelector('.username');
      userNameElement.textContent = user.login;
      userNameElement.href = user.html_url;
       //usernameEl.href = suggestedUser.html_url;
      var imgElement = suggestionElement.querySelector('img');
      imgElement.src = "";
      imgElement.src = user.avatar_url;

    }

  }

  private createSuggestionStream(closeClickStream): Observable<{}> {
    return closeClickStream.startWith('startup click').combineLatest(this.responseStream, (click, zz: Response) => {
      var z = zz.json();
      return z[Math.floor(Math.random()*z.length)];
    }).merge(this.refreshClickStream.map(()=>{return null})).startWith(null);
   
  }



}
