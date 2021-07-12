
export interface ICalcProps {
  yearPercent: number,
  yearNumber: number,
  monthIncome: number,
  startAmount: number,
  startAge: number,
}

export interface ICalcPeriodRes {
  amount: number,
  age: number,
}

export function calcPeriod({
  yearPercent,
  yearNumber,
  monthIncome,
  startAmount,
  startAge,
}: ICalcProps): ICalcPeriodRes {
  const periodNumPerYear = 12;
  const monthPercent = 1 + (yearPercent / 100) / periodNumPerYear;
  const numberOfMonth = yearNumber * periodNumPerYear;

  const newRes = (() => {
    if (monthIncome) {
      let newRes = startAmount;
      for (let i = 1; i <= numberOfMonth; i++) {
        newRes = Math.round(newRes * monthPercent * 100) / 100 + monthIncome;
      }

      return newRes;
    }

    return startAmount * Math.pow(monthPercent, numberOfMonth);
  })();

  const roundedRes = Math.round(newRes);

  return {
    amount: roundedRes,
    age: startAge + yearNumber,
  };
}
