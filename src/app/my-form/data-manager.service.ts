import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable, Subject } from 'rxjs/Rx';
import { User } from './user.interface';

@Injectable()
export class DataManagerService {

  private data: User[] = [];
  private subject: Subject<User> = new Subject<User>();

  constructor() { }

  addItem(person: User): void {
    this.data.push(person);
    this.subject.next(person);
  }

  getData(): Observable<User> {
    return this.subject.asObservable();
  }

  getDataArr(): User[] {
    return this.data;
  }


}
