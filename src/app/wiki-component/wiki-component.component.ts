import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

      //second input subscription
      this.items = this.myInput.valueChanges.debounceTime(400)
        .distinctUntilChanged().switchMap(myInput => this.wikipediaService.search(myInput))
        
   }

  ngOnInit() {
    // this.t3Data = new Observable<number>(observer => {
    //   setTimeout(() => {
    //     observer.next(5);
    //   },1000);
    //   setTimeout(() => {
    //     observer.complete();
    //   },2000);
    // });
  }

  //Button event from UI
  cyk() {
    this.wikipediaService.search2().subscribe(
      data => this.posts = data,
      error => console.log(error)
    );
    

    // this.t3Data.subscribe(
    //   v => console.log(v),
    //   error => console.log(error),
    //   () => console.log("completed")
    // );
    
  }

  posts: Observable<Array<string>>;
  private t3Data: Observable<number>;
  items: Observable<string[]>;
  inputItems: Array<string>;
  myInput = new FormControl();
  private searchTermStream = new Subject<string>();

  search(term: string) {
    this.searchTermStream.next(term);
  }

  // search (term: string) {
  //   this.items = this.wikipediaService.search(term);
  // }

}
