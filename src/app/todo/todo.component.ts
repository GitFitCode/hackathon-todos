import { Component, Input, OnInit } from '@angular/core';

import { Todo } from '../todo.interface';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input('todo') todo: Todo;

  constructor() { }

  ngOnInit(): void {
  }

}
