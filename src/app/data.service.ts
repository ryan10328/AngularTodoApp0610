import { Subject } from 'rxjs/rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";
import * as toastr from 'toastr';

const BASE_URL: string = 'http://localhost:3000/todos';


@Injectable()
export class DataService {

  todoSubject = new Subject<any[]>();
  todoListObs: Observable<any>;

  constructor(private http: Http) {

    this.todoListObs = this.todoSubject
      .debounceTime(1000)
      .concatMap(data => this.batchSaveTodos(data))
      .do(() => toastr.success('儲存成功'));

  }

  getTodos(): Observable<any[]> {
    return this.http.get(BASE_URL)
      .map(data => data.json());
  }

  batchSaveTodos(todos: any[]): Observable<any[]> {
    console.log(`batchSaveTodos()`);
    let obs: any[] = [];
    todos.forEach(data => {
      let req = this.http.put(`${BASE_URL}/${data.id}`, {
        todo: data.todo,
        done: data.done,
        editMode: data.editMode,
        editText: data.editText
      });
      obs.push(req);
    });

    return Observable.forkJoin(obs)
      .concatMap(data => this.getTodos());
  }


  addTodo(todo: string): Observable<any[]> {
    return this.http.post(BASE_URL, { todo: todo, done: false, editMode: false })
      .concatMap(data => this.getTodos());
  }

  clearCompleted(todos: any[]): Observable<any[]> {
    let obs: any[] = [];
    todos.forEach(data => {
      let req = this.http.delete(`${BASE_URL}/${data.id}`);
      obs.push(req);
    });

    return Observable.forkJoin(obs)
      .concatMap(data => this.getTodos());
  }

  toggleAll(todos: any[]): Observable<any[]> {
    let obs: any[] = [];
    todos.forEach(data => {
      let req = this.http.put(`${BASE_URL}/${data.id}`,
        { todo: data.todo, done: data.done, editMode: data.editMode });
      obs.push(req);
    });

    return Observable.forkJoin(obs)
      .concatMap(data => this.getTodos());
  }

  deleteTodo(item): Observable<any[]> {
    return this.http.delete(`${BASE_URL}/${item.id}`)
      .concatMap(data => this.getTodos());
  }

  toggleSingleTodo(item): Observable<any[]> {
    return this.http.put(`${BASE_URL}/${item.id}`, { done: item.done, todo: item.todo, editMode: item.editMode })
      .concatMap(data => this.getTodos());
  }


}
