import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint: string = 'What needs to be done???';
  myColSpan: number = 2;
  todos: any[] = [];

  addTodo(evt: KeyboardEvent) {
    let input = evt.target as HTMLInputElement;
    if (input.value) {
      // this.todos.push(input.value);
      this.todos = [...this.todos, input.value];

      input.value = '';
    }
  }
}
