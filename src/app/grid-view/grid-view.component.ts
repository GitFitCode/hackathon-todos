import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewTodoService } from '../new-todo.service';

@Component({
  selector: 'grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit, OnDestroy {
  displayNewTodo: boolean;
  displayNewTodoSub: Subscription;

  constructor(private newTodoService: NewTodoService) { }

  ngOnInit(): void {
    this.displayNewTodoSub = this.newTodoService.displayNewTodoSubject.subscribe(displayValue => {
      this.displayNewTodo = displayValue;
    });
  }

  exitNewTodo() {
    this.newTodoService.exitNewTodo();
  }

  ngOnDestroy() {
    if (this.displayNewTodoSub) this.displayNewTodoSub.unsubscribe();
  }
}
