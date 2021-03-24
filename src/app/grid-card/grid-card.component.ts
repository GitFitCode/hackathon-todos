import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodoUpdaterService } from '../todo-updater.service';
import { Todo } from '../todo.interface';

@Component({
  selector: 'grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})

export class GridCardComponent implements OnInit, OnDestroy {

  todos: Todo[] = [];
  subjectToSubscribeToName: string;
  iconPath: string;

  subjectToSubscribeToNameSub: Subscription;
  
  @Input('urgent') isUrgent;
  @Input('important') isImportant;

  constructor(private todoUpdaterService: TodoUpdaterService) { }

  ngOnInit(): void {
    //Determine which subject in service to subscribe to based on input values
    this.generateCardNameFromInputs();
    
    //set path name for card-specific icon
    this.iconPath = `../../assets/icon-full-${this.subjectToSubscribeToName}.png`;

    // concatenate specific subject name with 'Subject'
    this.subjectToSubscribeToName += 'Subject';
    this.subjectToSubscribeToNameSub = this.todoUpdaterService[this.subjectToSubscribeToName].subscribe((newTodoArray: Todo[]) => {
      this.todos = newTodoArray;
    });
  }

  //builds the card-specific string for use in img paths and service actions
  generateCardNameFromInputs() {
    if (this.isUrgent && this.isImportant) {
      this.subjectToSubscribeToName = 'urgentImportant';
    }
    else if (this.isUrgent) {
      this.subjectToSubscribeToName = "urgent";
    }
    else if (this.isImportant) {
      this.subjectToSubscribeToName = 'important'; 
    }
    else {
      this.subjectToSubscribeToName = 'neither'; 
    }
  }

  //called when a todo is changed and saved. 
  //calls service and passes in todo index and current grid-card values for urgent and important
  todoUpdated(newTodoData: Todo, todoId: number) {
    this.todoUpdaterService.todoUpdated(
      newTodoData,
      todoId,
      this.isUrgent,
      this.isImportant
    );
  }

  ngOnDestroy() {
    if (this.subjectToSubscribeToNameSub) this.todoUpdaterService[this.subjectToSubscribeToName].unsubscribe();
  }
}
