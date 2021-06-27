import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { PeriodForm } from '../calculator/calculator.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() period!: PeriodForm

  @Output() onChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onDurationChanged(event: any) {
    console.log('onDurationChanged')
    console.log(event.target.value)

    this.onChange.emit(event.target.value);
  }

}
