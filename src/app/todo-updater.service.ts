import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import mockData from './todo-mock-data';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})

export class TodoUpdaterService {
  //the filtered arrays of todos for each card
  private urgent: Todo[] = [];
  private urgentImportant: Todo[] = [];
  private important: Todo[] = [];
  private neither: Todo[] = [];

  //Array Subjects to emit changes to filtered todo arrays
  //When you first subscribe they pass an empty array
  urgentSubject = new BehaviorSubject<Todo[]>([]); 
  urgentImportantSubject = new BehaviorSubject<Todo[]>([]);
  importantSubject = new BehaviorSubject<Todo[]>([]);
  neitherSubject = new BehaviorSubject<Todo[]>([]);

  //grab todos (currently from mockData) and then distribute to cards
  constructor () {
    this.filterTodoDataToCardArrays();
    this.emitNewTodoArrays();
  }

  //go through mockData array and filter todos to separate arrays
  private filterTodoDataToCardArrays() {
    mockData.forEach((todo: Todo) => {
      if (todo.isUrgent && todo.isImportant)  {
        //{...todo} creates a new object vs just a reference 
        this.urgentImportant.push({...todo});
      }
      else if (todo.isUrgent) {
        this.urgent.push({...todo});
      }
      else if (todo.isImportant) {
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
