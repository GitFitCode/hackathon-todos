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
  unsavedChangesPresent: boolean = false;
  displayConfirmDelete: boolean = false;
  uniqueRadioButtonNameUrgent: string;
  uniqueRadioButtonNameImportant: string;

  @Input('todo') todo: Todo;
  @Input('todoIndex') todoIndex: number;
  @Input('cardName') cardName: string;  //example: urgentImportant
  @Output('todoUpdated') todoUpdated: EventEmitter<Todo> = new EventEmitter();
  @Output('todoDeleted') todoDeleted: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    //create radio button name = urgent-2-isUrgent
    this.generateRadioButtonNames();

    //create form and form controls. Populate them with inputted todo values
    this.todoForm = new FormGroup({
      isCompleted: new FormControl(this.todo.isCompleted),
      name: new FormControl(this.todo.name),
      description: new FormControl(this.todo.description),
      [this.uniqueRadioButtonNameUrgent]: new FormControl(this.todo.isUrgent),
      [this.uniqueRadioButtonNameImportant]: new FormControl(this.todo.isImportant),
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

  //create a new Todo with correct properties from form data
  //must do this instead of just sending form because of unique radio button names / Form Control Names
  generateTodoDataFromForm(): Todo {
    //fix unique radio button name
    //convert radio button values from strings to booleans 
    const newTodoData: Todo = {
      isCompleted: this.todoForm.value.isCompleted,
      name: this.todoForm.value.name,
      description: this.todoForm.value.description,
      isUrgent: this.todoForm.value[this.uniqueRadioButtonNameUrgent], //== "true" no longer needed since not a string
      isImportant: this.todoForm.value[this.uniqueRadioButtonNameImportant],
    };
    return newTodoData;
  }

  toggleDisplayExpanded() {
    if (!this.checkToDisplayIfChanges()) {
      this.displayExpandedFields = !this.displayExpandedFields;
    }
  }

  //displayExpandedFields || todoForm.dirty
  //compares current form values to original todo values 
  //if different, returns true to allow display
  checkToDisplayIfChanges(): boolean {
    //checks first if form was changed
    //then if true continues w/ a deeper check
    if (
      this.todoForm.dirty && 
      this.todoForm.value.name !== this.todo.name ||
      this.todoForm.value.description != this.todo.description ||
      this.todoForm.value[this.uniqueRadioButtonNameUrgent] !== this.todo.isUrgent ||
      this.todoForm.value[this.uniqueRadioButtonNameImportant] !== this.todo.isImportant
      ) {
        this.unsavedChangesPresent = true;
        return true;
      }
    else {
      this.unsavedChangesPresent = false;
      return false;
    }
  }

  //user unchecked/checked checkbox
  //immediately update, don't confirm
  onCheckedToggle() {
    this.onTodoUpdateSave();
  }

  //user wishes to delete all current changes and return to starting todo data
  onRevertChanges() {
    //reset ALL values
    this.todoForm.setValue({
      isCompleted: this.todo.isCompleted,
      name: this.todo.name,
      description: this.todo.description,
      [this.uniqueRadioButtonNameUrgent]: this.todo.isUrgent,
      [this.uniqueRadioButtonNameImportant]: this.todo.isImportant,
    });

    //set form back to pristine to remove "save" button
    this.todoForm.markAsPristine();
  }

  //Step 1
  onDeleteTodo() {
    this.displayConfirmDelete = true;
  }

  //Step 2
  onConfirmDelete() {
    this.todoDeleted.emit();
  }
}
