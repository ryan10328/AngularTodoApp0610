import { FooterComponent } from './footer/footer.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('myfooter') footer: FooterComponent;
  selectedType: string = 'all';
  inputHint: string = 'What needs to be done???';
  myColSpan: number = 2;
  todo: string;
  todos: any[] = [];

  addTodo() {
    // let input = evt.target as HTMLInputElement;
    if (this.todo) {
      //  this.todos.push(input.value);
      this.todos = [...this.todos, { todo: this.todo, done: false }];

      // input.value = '';
      this.todo = '';
    }

    // this.footer.hello();
  }

  clearCompleted() {
    this.todos = this.todos.filter(data => !data.done);
  }

  onSelectedType(evt) {
    console.log(evt);
    this.selectedType = evt;
  }
}
