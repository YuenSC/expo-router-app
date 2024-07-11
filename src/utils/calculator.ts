export enum CalculatorOperands {
  plus = "+",
  minus = "-",
  multiply = "×",
  divide = "÷",
  dot = ".",
  clearEntry = "CE",
}

export const calculateResult = (records: CalculatorRecord[]) => {
  const formattedRecords = [
    { num: "0", sign: CalculatorOperands.plus },
    ...records,
  ];

  const result = formattedRecords.reduce((prev, { sign }, index) => {
    const nextRecord = formattedRecords[index + 1];
    if (!nextRecord) return prev;

    let temp = prev;
    switch (sign) {
      case CalculatorOperands.plus:
        temp = temp + Number(nextRecord.num);
        break;
      case CalculatorOperands.minus:
        temp = temp - Number(nextRecord.num);
        break;
      case CalculatorOperands.multiply:
        temp = temp * Number(nextRecord.num);
        break;
      case CalculatorOperands.divide:
        temp = temp / Number(nextRecord.num);
        break;
    }
    return parseFloat(temp.toFixed(2));
  }, 0);

  return result;
};

export type CalculatorRecord = {
  num: string;
  sign?:
    | CalculatorOperands.divide
    | CalculatorOperands.multiply
    | CalculatorOperands.minus
    | CalculatorOperands.plus;
};

export const CalculatorButtons = [
  ["7", "8", "9", CalculatorOperands.divide],
  ["4", "5", "6", CalculatorOperands.multiply],
  ["1", "2", "3", CalculatorOperands.minus],
  [
    CalculatorOperands.dot,
    "0",
    CalculatorOperands.clearEntry,
    CalculatorOperands.plus,
  ],
];
