import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { IPeriodForm, IResultItem } from '../calculator/calculator.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() period!: IPeriodForm;
  @Input() isNoCloseBtn!: boolean;
  @Input() periodResult!: IResultItem;

  @Output() onChange = new EventEmitter();
  @Output() onRemovePeriod = new EventEmitter();

  expenses: string = '';
  toInvest: string = '';

  constructor() { }

  ngOnInit(): void {
    this.calcAndSetExpensesAndToInvest();
  }

  modelChanged(): void {
    this.onChange.emit();
    this.calcAndSetExpensesAndToInvest();
  }
  inputWithValidation(event: any): void {
    const rowValue = event.target.value;
    const validatedValue = (+rowValue.replace(/\D/g, '')).toLocaleString();

    event.target.value =  validatedValue;
    // @ts-ignore
    this.period[event.target.name] = validatedValue;
    this.modelChanged();
  }
  calcAndSetExpensesAndToInvest(): void {
    const income = +this.period.totalIncome.replace(/\D/g, '');
    this.expenses = Math
      .round(income * (100 - this.period.investmentPercentage) / 100)
      .toLocaleString();
    this.toInvest = Math
      .round(income * this.period.investmentPercentage / 100)
      .toLocaleString();
  }
}
