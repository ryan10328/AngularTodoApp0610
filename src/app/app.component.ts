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

    // 當發現 localStorage 裡面有東西就取出來
    let storedTodo = localStorage.getItem('todo');
    if (storedTodo) {
      this.todo = storedTodo;
    }

    // 任務 15 進階練習 - 每 15 秒儲存一次
    setInterval(() => {
      console.log(`每 15 秒儲存一次: ${this.todo}`);
      // 當 todo 裡面有東西且和原本存的不一樣才存
      localStorage.setItem('todo', this.todo ? this.todo : '');
    }, 15000);


  }
  // 任務 16 進階練習 - 資料發生異動時儲存一次
  todoChange() {
    console.log(`資料發生異動儲存一次: ${this.todo}`);
    localStorage.setItem('todo', this.todo ? this.todo : '');
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
