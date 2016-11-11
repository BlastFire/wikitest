import { Component, OnInit } from '@angular/core';
import { WikiServiceService } from './wiki-service.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-wiki-component',
  templateUrl: './wiki-component.component.html'
})
export class WikiComponentComponent implements OnInit {

  constructor(private wikipediaService: WikiServiceService) {
    this.items = this.searchTermStream.debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term:string) => this.wikipediaService.search(term));
   }

  ngOnInit() {
  }

  items: Observable<string[]>;
  private searchTermStream = new Subject<string>();

  search(term: string) {
    this.searchTermStream.next(term);
  }

  // search (term: string) {
  //   this.items = this.wikipediaService.search(term);
  // }

}
