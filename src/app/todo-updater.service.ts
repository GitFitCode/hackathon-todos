import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import mockData from './todo-mock-data';
import { Todo } from './todo.interface';
import { SimpleDateService } from './simple-date.service';

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
  constructor (private simpletDateService: SimpleDateService) {
    this.filterTodoDataToCardArrays();
    this.emitNewTodoArrays();
  }

  //handle any saved changes on a todo
  todoUpdated(
    newTodoData: Todo, 
    todoId: number, 
    sourceCardIsUrgent: boolean, 
    sourceCardIsImportant: boolean) { //add delete optional parameter here ... MAYBE
      
      // 1) FOR ALL UPDATES:
      //reach out to database and update the todo entry based off UID (unique id)
      //this.http(PATCH, url, newTodoData)

      // 2A) FOR REGULAR UPDATES:
      //changing these properties will NOT affect card positioning
      //so update only one card array 
      if (
        newTodoData.isUrgent === sourceCardIsUrgent && 
        newTodoData.isImportant == sourceCardIsImportant) {
          this.updateSingleCardArray(newTodoData, todoId);
      }
      // 2B) FOR URGENT/IMPORTANT PROPERTY UPDATES:
      //changing these properties will move the todo to a new card
      //so update both source and destination card arrays
      else {
          this.updateCardArrays(newTodoData, todoId, sourceCardIsUrgent, sourceCardIsImportant);
      }
  }

  //specifically for when todo is completed
  todoCompleted(newTodoData: Todo, todoId: number, ) {
    let completedDate;
    if (newTodoData.isCompleted) {
      completedDate = this.simpletDateService.getTimeSeconds();
      newTodoData.completedDate = completedDate;
    }
    else newTodoData.completedDate = 0;

    //1) reach out to database and update the todo entry's date based off UID (unique id)
    //this.http(PATCH, url, newTodoData)

    //2) changing completed property only affects source card
    this.updateSingleCardArray(newTodoData, todoId);
  }

  //SHOULD TODO BE DELETED OR STORED FOR GRAPHS AND MERELY FILTERED?
  //handle any deleted todo
  todoDeleted(
    todoId: number,
    sourceCardIsUrgent: boolean,
    sourceCardIsImportant: boolean) {
      //1) Reach out to DB and DELETE based off unique ID

      //2) Delete Todo from source card array
      const sourceArrayName = this.buildArrayVariableName(sourceCardIsUrgent, sourceCardIsImportant);
      this[sourceArrayName].splice(todoId, 1);
  }

  //handle any new todo
  todoCreated(newTodoData: Todo) {
    //set creation date and (optionally) completed date
    const creationDate = this.simpletDateService.getTimeSeconds();
    let completedDate = 0;
    if (newTodoData.isCompleted) completedDate = creationDate;

    //1) use a POST request to add to DB

    //2) Push new todo to correct card array
    const destinationArrayName = this.buildArrayVariableName(newTodoData.isUrgent, newTodoData.isImportant);
    this[destinationArrayName].push({
      ...newTodoData,
      createdDate: creationDate,
      completedDate: completedDate
    });
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

  //used at constructor to provide correct array to each card
  //bc these arrays are by reference, no subsequent emits/nexts
  private emitNewTodoArrays() {
    this.urgentImportantSubject.next(this.urgentImportant);
    this.urgentSubject.next(this.urgent);
    this.importantSubject.next(this.important);
    this.neitherSubject.next(this.neither);
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

  //update ONLY source card array bc todo will not move
  private updateSingleCardArray(
    newTodoData: Todo, 
    todoId: number) {
      const sourceArrayName = this.buildArrayVariableName(newTodoData.isUrgent, newTodoData.isImportant);

      //retrieve the properties' keys for the new todo data
      const newTodoKeysArray = Object.keys(newTodoData);

      //iterate over old todo data and replace each key with new data
      //any previous values not updated will remain
      //any new properties will be added
      for (let key of newTodoKeysArray) {
        this[sourceArrayName][todoId][key] = newTodoData[key];
      }
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
