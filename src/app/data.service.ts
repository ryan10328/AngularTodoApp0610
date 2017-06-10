import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

const BASE_URL: string = 'http://localhost:3000/todos';


@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getTodos(): Observable<any[]> {
    return this.http.get(BASE_URL)
      .map(data => data.json());
  }

  addTodo(todo: string): Observable<any[]> {
    return this.http.post(BASE_URL, { todo: todo, done: false })
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
        { todo: data.todo, done: data.done });
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
    return this.http.put(`${BASE_URL}/${item.id}`, { done: item.done, todo: item.todo })
      .concatMap(data => this.getTodos());
  }


}
