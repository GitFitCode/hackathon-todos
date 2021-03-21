import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Todo } from '../todo.interface';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;

  @Input('todo') todo: Todo;
  @Output('todoUpdated') todoUpdated: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    //create form and form controls. Populate them with inputted todo values
    this.todoForm = new FormGroup({
      isCompleted: new FormControl(this.todo.isCompleted),
      name: new FormControl(this.todo.name),
      isUrgent: new FormControl(this.todo.isUrgent),
      isImportant: new FormControl(this.todo.isImportant),
    });
  }

  //called when user saves changes
  onTodoUpdateSave() {
    //emit new todo values to parent grid-card to be passed to service
    this.todoUpdated.emit(this.todoForm.value);
    
    //set form back to pristine to remove "save" button
    this.todoForm.markAsPristine();
  }
}
