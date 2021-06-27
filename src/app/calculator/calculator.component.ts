import { Component, OnInit } from '@angular/core';

export interface PeriodForm {
  duration: number,
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  periods: PeriodForm[] = [
    {
      duration: 1,
    },
    {
      duration: 2,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onFormChange(event: any) {
    console.log('onFormChange');
    console.log(event)
  }
}
