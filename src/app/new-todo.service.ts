import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NewTodoService {
  private displayNewTodo: boolean = false;
  private displayScrollbars: boolean = true;

  displayNewTodoSubject = new BehaviorSubject<boolean>(false);
  displayScrollbarsSubject = new BehaviorSubject<boolean>(true);

  constructor() {}

  //only activated with button press 
  //toggle ok then
  onNewTodo(){
    this.displayNewTodo = !this.displayNewTodo;
    this.displayNewTodoSubject.next(this.displayNewTodo);
  }

  exitNewTodo() {
    this.displayNewTodo = false;
    this.displayNewTodoSubject.next(this.displayNewTodo);
  }

  //Temporary Fix: this should be in its own service or a more fitting one
  onToggleScrollbars() {
    this.displayScrollbars = !this.displayScrollbars;
    this.displayScrollbarsSubject.next(this.displayScrollbars);
  }
}