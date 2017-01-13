import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable, Subject } from 'rxjs/Rx';
import { User } from './user.interface';

@Injectable()
export class DataManagerService {

  private data: User[] = [];
  private addSubject: Subject<User> = new Subject<User>();
  private editSubject: Subject<User> = new Subject<User>();
  private counter: number = 0;

  constructor() { }

  manageItem(person: User, config?: {edit: boolean}): void {
    if(config) {
      this.editSubject.next(person);
      return;
    }
    person.id = this.increaseCounter();
    this.data.push(person);
    this.addSubject.next(person);
  }

  getDataArr(): User[] {
    return this.data;
  }

  getData(config?: {edit: boolean}): Observable<User> {
    if(config) return this.editSubject.asObservable();
    return this.addSubject.asObservable();
  }

  checkIfEmailAlreadyExists(email: string): User {
    return this.getDataArr().filter(p => {
      if(email === p.email) {
        return p.id ? true : false;
      }
    }).pop();
   }

  increaseCounter(): number {
    return ++this.counter;
  }

  deleteRecord(person: User) {
    this.data = this.getDataArr().filter((p) => p.id != person.id );
    this.addSubject.next(null);
  }
  
}
