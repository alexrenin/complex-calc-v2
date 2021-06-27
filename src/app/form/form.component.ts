import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  year = 1;

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
