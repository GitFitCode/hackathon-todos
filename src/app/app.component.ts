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
  responsiveViewEnabled: boolean = true;

  onNewTodo(){
    this.displayNewTodo = !this.displayNewTodo;
  }

  exitNewTodo() {
    this.displayNewTodo = false;
  }

  styleGridView() {
    //{'width': responsiveViewEnabled ? 'calc(128vh - 20px)' : '1102px'; 
    //'height': responsiveViewEnabled ? 'calc(100vh - 20px)' : '860px'}

    if (this.responsiveViewEnabled) {
      return {width: 'calc(128vh - 20px)', height: 'calc(100vh - 20px)'};
    }
    return {width: '1102px', height: '860px'};
  }
}
