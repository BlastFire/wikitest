import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class DataManagerService {

  private data: Person[] = [];
  private subject: Subject<Person> = new Subject<Person>();

  constructor() { }

  addItem(person: Person): void {
    this.data.push(person);
    this.subject.next(person);
  }

  getData(): Observable<Person> {
    return this.subject.asObservable();
  }

  getDataArr(): Person[] {
    return this.data;
  }


}
