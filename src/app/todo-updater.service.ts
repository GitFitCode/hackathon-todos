import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import mockData from './todo-mock-data';

@Injectable({
  providedIn: 'root'
})

export class TodoUpdaterService {
  //one array for each card
  private urgent: Object[] = [];
  private urgentImportant: Object[] = [];
  private important: Object[] = [];
  private neither: Object[] = [];

  //Array Subjects to emit changes
  urgentSubject = new BehaviorSubject([]);
  urgentImportantSubject = new BehaviorSubject([]);
  importantSubject = new BehaviorSubject([]);
  neitherSubject = new BehaviorSubject([]);

  constructor () {
    this.run();
    this.filterTodoDataToCardArrays();
    this.emitNewTodoArrays();

    console.log(this.urgent);
    console.log(this.urgentImportant);
    console.log(this.important);
    console.log(this.neither);
  }

  private run() {
    console.log(mockData[3]);
  }

  private filterTodoDataToCardArrays() {
    //go through mockData array and filter todos to separate arrays
    mockData.forEach(todo => {
      if (todo.urgent) {
        if (todo.important) {
          //{...todo} creates a new object vs just a reference 
          this.urgentImportant.push({...todo});
        }
        else {
          this.urgent.push({...todo});
        }
      }
      else if (todo.important) {
        this.important.push({...todo});
      }
      else {
        this.neither.push({...todo});
      }
    });
  }

  private emitNewTodoArrays() {
    this.urgentSubject.next(this.urgent);
    this.urgentImportantSubject.next(this.urgentImportant);
    this.importantSubject.next(this.important);
    this.neitherSubject.next(this.neither);
  }
}