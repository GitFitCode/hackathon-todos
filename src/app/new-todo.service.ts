import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NewTodoService {
  private displayNewTodo: boolean = false;
  displayNewTodoSubject = new BehaviorSubject<boolean>(false);

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
}