import { Component, Input, OnInit } from '@angular/core';

import { TodoUpdaterService } from '../todo-updater.service';

@Component({
  selector: 'grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent implements OnInit {

  todos: Object[] = [];
  
  @Input('urgent') isUrgent;
  @Input('important') isImportant;

  constructor(private todoUpdaterService: TodoUpdaterService) { }

  ngOnInit(): void {
    console.log(this.isImportant);

    let subjectToSubscribeToName = "urgent";
    if (this.isUrgent) {
      if (this.isImportant) subjectToSubscribeToName = 'urgentImportant';
    }
    else if (this.isImportant) {
      subjectToSubscribeToName = 'important'; 
    }
    else {
      subjectToSubscribeToName = 'neither'; 
    }
    subjectToSubscribeToName = subjectToSubscribeToName + 'Subject';
    this.todoUpdaterService[subjectToSubscribeToName].subscribe((newTodoArray) => {
      this.todos = newTodoArray;
      console.log(this.todos);
    });
  }

}
