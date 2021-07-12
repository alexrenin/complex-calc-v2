import { Component, OnInit } from '@angular/core';

import { calcPeriod } from '../helpers';

const LS_KEY = 'calculator-state';

export interface IPeriodForm {
  duration: number,
  totalIncome: string,
  annualPercentage: number,
  investmentPercentage: number,
}
export interface IResultItem {
  str: string,
  percent4str: string,
  age: number,
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  periods: IPeriodForm[] = [];
  initAmount: string = '0';
  result: IResultItem[] = [];
  initAge: number = 18;

  constructor() {
    const storage = localStorage.getItem(LS_KEY)
    const {
      periods: periodsFromStorage,
      initAmount: initAmountFromStorage = '0',
      initAge: initAgeFromStorage = 18,
    } = JSON.parse(storage || '{}');
    this.periods = periodsFromStorage|| [
      {
        duration: 1,
        totalIncome: '0',
        annualPercentage: 5,
        investmentPercentage: 15,
      },
    ]
    this.initAmount = initAmountFromStorage;
    this.initAge = initAgeFromStorage;
    this.result = this.getCalcResult();
  }

  ngOnInit(): void {
  }

  onFormChange() {
    this.result = this.getCalcResult();
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        periods: this.periods,
        initAmount: this.initAmount,
        initAge: this.initAge,
      }),
    );
  }
  onAddNewPeriod() {
    this.periods = [
      ...this.periods,
      {
        ...this.periods[this.periods.length - 1],
      },
    ];
    this.onFormChange()
  }
  onRemovePeriod(index: number) {
    this.periods = [
      ...this.periods.slice(0, index),
      ...this.periods.slice(index + 1),
    ];
    this.onFormChange()
  }
  inputWithValidation(event: any) {
    const rowValue = event.target.value;
    const validatedValue = (+rowValue.replace(/\D/g, "")).toLocaleString();

    event.target.value =  validatedValue;
    // @ts-ignore
    this.initAmount = validatedValue;
    this.onFormChange();
  }
  getCalcResult(): IResultItem[]  {
    const newResult = this.periods
      .reduce(
        (
          acc,
          { duration, totalIncome, annualPercentage, investmentPercentage },
        ) => {
          const lastAmount = acc[acc.length - 1].amount;
          const lastAge = acc[acc.length - 1].age;
          const periodCalcRes = calcPeriod({
            yearPercent: annualPercentage,
            yearNumber: duration,
            monthIncome: (+totalIncome.replace(/\D/g, "")) * investmentPercentage / 100,
            startAmount: lastAmount,
            startAge: lastAge,
          });

          return [
            ...acc,
            periodCalcRes,
          ];
        },
        [{
          amount: +this.initAmount.replace(/\D/g, ""),
          age: +this.initAge,
        }]
      )
      .slice(1)
      .map(({ amount, age }) => {
        const transformedItem: IResultItem = {
          str: amount.toLocaleString(),
          percent4str: Math.round(amount * 0.04 / 12).toLocaleString(),
          age,
        }

        return transformedItem;
      });

    return newResult;
  }
}
