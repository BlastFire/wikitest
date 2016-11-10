import { Component, OnInit } from '@angular/core';
import { WikiServiceService } from './wiki-service.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-wiki-component',
  templateUrl: './wiki-component.component.html'
})
export class WikiComponentComponent implements OnInit {

  constructor(private wikipediaService: WikiServiceService) { }

  ngOnInit() {
  }

  items: Observable<string[]>;
  search (term: string) {
    this.items = this.wikipediaService.search(term);
  }

}
