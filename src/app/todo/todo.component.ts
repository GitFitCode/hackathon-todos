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
  displayExpandedFields: boolean = false; 
  uniqueRadioButtonNameUrgent: string;
  uniqueRadioButtonNameImportant: string;

  @Input('todo') todo: Todo;
  @Input('todoIndex') todoIndex: number;
  @Input('cardName') cardName: string;  //example: urgentImportant
  @Output('todoUpdated') todoUpdated: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    //create radio button name = urgent-2-isUrgent
    this.generateRadioButtonNames();

    //create form and form controls. Populate them with inputted todo values
    this.todoForm = new FormGroup({
      isCompleted: new FormControl(this.todo.isCompleted),
      name: new FormControl(this.todo.name),
      [this.uniqueRadioButtonNameUrgent]: new FormControl(this.todo.isUrgent.toString()),
      [this.uniqueRadioButtonNameImportant]: new FormControl(this.todo.isImportant.toString()),
    });
  }

  //radio buttons are connected by having the same "name" property
  //hence each todo component needs its own unique name to connect ONLY its own radio buttons
  generateRadioButtonNames() {
    this.uniqueRadioButtonNameUrgent = `${this.cardName}-${this.todoIndex}-isUrgent`;
    this.uniqueRadioButtonNameImportant = `${this.cardName}-${this.todoIndex}-isImportant`;
  }

  //called when user saves changes
  onTodoUpdateSave() {
    //emit new todo values to parent grid-card to be passed to service
    this.todoUpdated.emit(
      this.generateTodoDataFromForm()
    );
    
    //set form back to pristine to remove "save" button
    this.todoForm.markAsPristine();
  }

  generateTodoDataFromForm(): Todo {
    //fix unique radio button name
    //convert radio button values from strings to booleans 
    const newTodoData: Todo = {
      isCompleted: this.todoForm.value.isCompleted,
      name: this.todoForm.value.name,
      isUrgent: this.todoForm.value[this.uniqueRadioButtonNameUrgent] == "true",
      isImportant: this.todoForm.value[this.uniqueRadioButtonNameImportant] == "true",
    };
    return newTodoData;
  }

  toggleDisplayExpanded() {
    this.displayExpandedFields = !this.displayExpandedFields;
  }
}
