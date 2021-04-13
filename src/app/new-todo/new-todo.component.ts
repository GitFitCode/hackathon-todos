import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoUpdaterService } from '../todo-updater.service';
import { Todo } from '../todo.interface';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  todoForm: FormGroup;
  
  @Output('exitStarted') exitStarted: EventEmitter<any> = new EventEmitter();

  constructor(private todoUpdaterService: TodoUpdaterService) { }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      isCompleted: new FormControl(false),  //Default text value is empty string ""
      name: new FormControl("", Validators.required),
      description: new FormControl(""),
      newTodoIsUrgent: new FormControl(false),  //Default radio button is "NOT-*"
      newTodoIsImportant: new FormControl(false),
    });
  }

  //exit component on button press or submit
  onExit() {
    this.exitStarted.emit();
  }

  //check if form is valid and user has interacted with it 
  //bc don't give warnings before giving a chance
  formIsValid() {
    const touched = this.todoForm.get('name').touched;
    const isValid = this.todoForm.valid;

    if (touched && !isValid) return false;
    else return true;
  }

  onFormSubmit() {
    if (this.todoForm.valid) {
      //send new todo to service 
      this.todoUpdaterService.todoCreated(
        this.generateTodoDataFromForm()
      );
      
      //emit to close component
      this.onExit();
    }
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
      isUrgent: this.todoForm.value.newTodoIsUrgent,
      isImportant: this.todoForm.value.newTodoIsImportant,
    };
    return newTodoData;
  }
}
