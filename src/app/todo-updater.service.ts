import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import mockData from './todo-mock-data';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})

export class TodoUpdaterService {
  //the filtered arrays of todos for each card
  private urgentImportant: Todo[] = [];
  private urgent: Todo[] = [];
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
    this.urgentImportantSubject.next(this.urgentImportant);
    this.urgentSubject.next(this.urgent);
    this.importantSubject.next(this.important);
    this.neitherSubject.next(this.neither);
  }

  //handle any saved changes on a todo
  todoUpdated(
    newTodoData: Todo, 
    todoId: number, 
    sourceCardIsUrgent: boolean, 
    sourceCardIsImportant: boolean) {
      
      // 1) FOR ALL UPDATES:
      //reach out to database and update the todo entry based off UID (unique id)
      //this.http(PATCH, url, newTodoData)


      // 2) FOR URGENT/IMPORTANT PROPERTY UPDATES:
      //changing these properties will move the todo to a new card
      //so update both source and destination card arrays

      /*
       * Note: if the updates do not change the card then there is no need to change the arrays:
       * the changes will be recorded in database as above
       * the new changes remain visible on the form/todo
       * on reload all todos will be loaded from database
       * [this strategy will need to be updated if drag & drop is implemented]
      */
      if (newTodoData.isUrgent !== sourceCardIsUrgent || newTodoData.isImportant !== sourceCardIsImportant) {
        this.updateCardArrays(newTodoData, todoId, sourceCardIsUrgent, sourceCardIsImportant);
        this.emitNewTodoArrays();
      }
  }

  //update source and destination card arrays
  private updateCardArrays(
    newTodoData: Todo, 
    todoId: number, 
    sourceCardIsUrgent: boolean, 
    sourceCardIsImportant: boolean) {
      //delete todo from previous, source array using splice
      const sourceArrayName = this.buildArrayVariableName(sourceCardIsUrgent, sourceCardIsImportant);
      this[sourceArrayName].splice(todoId, 1);

      //add todo to new, destination array
      const destinationArrayName = this.buildArrayVariableName(newTodoData.isUrgent, newTodoData.isImportant);
      this[destinationArrayName].push({...newTodoData});
  }

  //takes the two boolean properties and returns a string corresponding to card array name
  private buildArrayVariableName(isUrgent: boolean, isImportant: boolean): string {
    let arrayVariableName;
    if (isUrgent && isImportant) {
      arrayVariableName = 'urgentImportant';
    }
    else if (isUrgent) {
      arrayVariableName = "urgent";
    }
    else if (isImportant) {
      arrayVariableName = 'important'; 
    }
    else {
      arrayVariableName = 'neither'; 
    }
    return arrayVariableName;
  }
}
