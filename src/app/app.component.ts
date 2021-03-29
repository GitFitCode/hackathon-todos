import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackathon-todos';
  displayNewTodo: boolean = false;
  darkModeEnabled: boolean = false;

  onNewTodo(){
    this.displayNewTodo = !this.displayNewTodo;
  }

  exitNewTodo() {
    this.displayNewTodo = false;
  }
}
