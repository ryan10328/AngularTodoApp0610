import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  moreThanFive: boolean = false;

  ngOnChanges() {
    console.log('ngOnChanges');
    if (this.myTodos.length >= 5) {
      this.moreThanFive = true;
    }

  }

  @Input('todos') myTodos: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
