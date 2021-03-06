import { Component, Input, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodoUpdaterService } from '../todo-updater.service';
import { Todo } from '../todo.interface';
import { NewTodoService } from '../new-todo.service';

@Component({
  selector: 'grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})

export class GridCardComponent implements OnInit, OnDestroy {

  todos: Todo[] = [];
  cardName: string;  //example: urgentImportant
  subjectToSubscribeToName: string;  //is cardName + 'Subject'
  iconPath: string;

  subjectToSubscribeToNameSub: Subscription;
  displayScrollbarsSub: Subscription;
  
  @Input('urgent') isUrgent;
  @Input('important') isImportant;

  @HostBinding('style.overflow-y') scroll;

  constructor(private todoUpdaterService: TodoUpdaterService, private newTodoService: NewTodoService) { }

  ngOnInit(): void {
    //Determine which subject in service to subscribe to based on input values
    this.cardName = this.generateCardNameFromInputs();
    
    //set path name for card-specific icon
    this.iconPath = `../../assets/card/icon-full-${this.cardName}.png`;

    // concatenate specific subject name with 'Subject'
    this.subjectToSubscribeToName = this.cardName + 'Subject';
    this.subjectToSubscribeToNameSub = this.todoUpdaterService[this.subjectToSubscribeToName].subscribe((newTodoArray: Todo[]) => {
      this.todos = newTodoArray;
    });

    //set up scrollbars from service
    this.displayScrollbarsSub = this.newTodoService.displayScrollbarsSubject.subscribe(displayScrollbars => {
      displayScrollbars ? this.scroll = 'auto' : this.scroll = 'hidden';
    });
  }

  //builds the card-specific string for use in img paths and service actions
  generateCardNameFromInputs(): string {
    if (this.isUrgent && this.isImportant) {
      return 'urgentImportant';
    }
    else if (this.isUrgent) {
      return "urgent";
    }
    else if (this.isImportant) {
      return'important'; 
    }
    else {
      return'neither'; 
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

  handleTodoDeleted(todoId: number) {
    this.todoUpdaterService.todoDeleted(
      todoId,
      this.isUrgent,
      this.isImportant
    );
  }

  ngOnDestroy() {
    if (this.subjectToSubscribeToNameSub) this.todoUpdaterService[this.subjectToSubscribeToName].unsubscribe();
    if (this.displayScrollbarsSub) this.displayScrollbarsSub.unsubscribe();
  }
}
