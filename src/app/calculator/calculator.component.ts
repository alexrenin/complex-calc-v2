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

  constructor() {
    const storage = localStorage.getItem(LS_KEY)
    const {
      periods: periodsFromStorage,
      initAmount: initAmountFromStorage = '0',
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
  getCalcResult() {
    const newResult = this.periods
      .reduce(
        (
          acc: number[],
          { duration, totalIncome, annualPercentage, investmentPercentage },
        ) => {
          const lastAmount = acc[acc.length - 1]
          const periodCalcRes = calcPeriod({
            yearPercent: annualPercentage,
            yearNumber: duration,
            monthIncome: (+totalIncome.replace(/\D/g, "")) * investmentPercentage / 100,
            startAmount: lastAmount,
          });

          return [
            ...acc,
            periodCalcRes,
          ];
        },
        [+this.initAmount.replace(/\D/g, "")]
      )
      .slice(1)
      .map((item) => {

        const transformedItem: IResultItem = {
          str: item.toLocaleString(),
          percent4str: Math.round(item * 0.04 / 12).toLocaleString(),
        }

        return transformedItem;
      });

    return newResult;
  }
}
