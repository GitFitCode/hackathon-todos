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

  subjectToSubscribeToNameSub: Subscription;
  
  @Input('urgent') isUrgent;
  @Input('important') isImportant;

  constructor(private todoUpdaterService: TodoUpdaterService) { }

  ngOnInit(): void {
    //Determine which subject in service to subscribe to based on input values
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

    // concactenate specific subject name with 'Subject'
    this.subjectToSubscribeToName += 'Subject';
    this.subjectToSubscribeToNameSub = this.todoUpdaterService[this.subjectToSubscribeToName].subscribe((newTodoArray: Todo[]) => {
      this.todos = newTodoArray;
    });
  }

  ngOnDestroy() {
    if (this.subjectToSubscribeToNameSub) this.todoUpdaterService[this.subjectToSubscribeToName].unsubscribe();
  }
}
