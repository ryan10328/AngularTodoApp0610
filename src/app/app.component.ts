import { DataService } from './data.service';
import { FooterComponent } from './footer/footer.component';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/rx';
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http,
    private dataService: DataService) {
    this.dataService.getTodos().subscribe(data => this.todos = data);
  }

  // @ViewChild('myfooter') footer: FooterComponent;
  selectedType: string = 'all';
  inputHint: string = 'What needs to be done???';
  myColSpan: number = 2;
  todo: string;
  todos: any[] = [];
  isToggleAll: boolean = false;


  addTodo() {
    // let input = evt.target as HTMLInputElement;
    if (this.todo) {
      //  this.todos.push(input.value);
      // this.todos = [...this.todos, { todo: this.todo, done: false }];

      this.dataService.addTodo(this.todo)
        .subscribe(data => this.todos = data);

      // input.value = '';
      this.todo = '';
    }

    // this.footer.hello();
  }

  clearCompleted() {
    this.todos = this.todos.filter(data => data.done);

    this.dataService.clearCompleted(this.todos)
      .subscribe(data => this.todos = data);

  }

  onSelectedType(evt) {
    console.log(evt);
    this.selectedType = evt;
  }

  toggleAll() {
    this.todos = this.todos.map(item => {
      return item.done === this.isToggleAll ?
        { todo: item.todo, done: item.done, id: item.id } :
        { todo: item.todo, done: !item.done, id: item.id };
    });


    this.dataService.toggleAll(this.todos)
      .subscribe(data => this.todos = data);
  }

  deleteTodo(item) {
    // this.todos = this.todos.filter(data => item != data);
    this.dataService.deleteTodo(item)
      .subscribe(data => this.todos = data);
  }

  toggleSingleTodo(item) {
    this.dataService.toggleSingleTodo(item)
      .subscribe(data => this.todos = data);
  }
}
