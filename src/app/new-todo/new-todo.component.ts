import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  @Output('exitStarted') exitStarted: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    //Default radio button is "NOT-*"
  }

  onExit() {
    this.exitStarted.emit();
  }
}
