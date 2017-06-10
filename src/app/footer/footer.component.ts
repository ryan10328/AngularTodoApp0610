import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // moreThanFive: boolean = false;

  // ngOnChanges() {
  //   console.log('ngOnChanges');
  //   if (this.myTodos.length >= 5) {
  //     this.moreThanFive = true;
  //   }

  // }

  private _todos: any[] = [];

  get todos() {
    return this._todos;
  }

  @Input() set todos(value) {
    this._todos = value;
  }

  selectedType: string = 'all';
  @Output() onClearCompeted = new EventEmitter();
  @Output() onSelectTypeChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clearCompleted() {
    this.onClearCompeted.emit();
  }

  hello() {
    console.log('Hello, Angular4');
  }

  onSelectedType(type) {
    this.selectedType = type;
    this.onSelectTypeChange.emit(type);
  }

}
