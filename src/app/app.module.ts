import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { GridCardComponent } from './grid-card/grid-card.component';
import { TodoComponent } from './todo/todo.component';
import { NewTodoComponent } from './new-todo/new-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
    GridCardComponent,
    TodoComponent,
    NewTodoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
