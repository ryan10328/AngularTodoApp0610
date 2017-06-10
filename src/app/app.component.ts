import { FooterComponent } from './footer/footer.component';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/rx';
import { Observable } from "rxjs/Observable";

const BASE_URL: string = 'http://localhost:3000/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {
    this.getTodos().subscribe(data => this.todos = data);
  }

  // @ViewChild('myfooter') footer: FooterComponent;
  selectedType: string = 'all';
  inputHint: string = 'What needs to be done???';
  myColSpan: number = 2;
  todo: string;
  todos: any[] = [];
  isToggleAll: boolean = false;

  getTodos(): Observable<any[]> {
    return this.http.get(BASE_URL)
      .map(data => data.json());
  }

  addTodo() {
    // let input = evt.target as HTMLInputElement;
    if (this.todo) {
      //  this.todos.push(input.value);
      // this.todos = [...this.todos, { todo: this.todo, done: false }];

      this.http.post(BASE_URL, { todo: this.todo, done: false })
        .concatMap(data => this.getTodos())
        .subscribe(data => this.todos = data);

      // input.value = '';
      this.todo = '';
    }

    // this.footer.hello();
  }

  clearCompleted() {
    this.todos = this.todos.filter(data => data.done);

    let obs: any[] = [];
    this.todos.forEach(data => {
      let req = this.http.delete(`${BASE_URL}/${data.id}`);
      obs.push(req);
    });

    Observable.forkJoin(obs)
      .concatMap(data => this.getTodos())
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


    let obs: any[] = [];
    this.todos.forEach(data => {
      let req = this.http.put(`${BASE_URL}/${data.id}`,
        { todo: data.todo, done: data.done });
      obs.push(req);
    });

    Observable.forkJoin(obs)
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);
  }

  deleteTodo(item) {
    // this.todos = this.todos.filter(data => item != data);
    this.http.delete(`${BASE_URL}/${item.id}`)
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);
  }

  toggleSingleTodo(item) {
    this.http.put(`${BASE_URL}/${item.id}`, { done: item.done, todo: item.todo })
      .concatMap(data => this.getTodos())
      .subscribe(data => this.todos = data);
  }
}
