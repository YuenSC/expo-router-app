import { CreateExpenseTransaction } from "../api/types/Expense";
import { AllCurrencyCodes, CurrencyCode } from "../constants/Currency";

export const roundAmountToDecimal = (amount: number, decimal: number = 2) => {
  if (Number.isNaN(amount)) return 0;
  console.log("amount", typeof amount);
  return parseFloat(amount.toFixed(decimal));
};

export const formatAmount = (
  amount: number,
  currencyCode?: string,
  options?: {
    currencySymbol?: "symbol" | "code";
  },
) => {
  const formattedAmount = roundAmountToDecimal(amount);

  const sign = formattedAmount < 0 ? "-" : "";
  const currencySymbol = options?.currencySymbol ?? "code";
  const currency = currencyCode
    ? AllCurrencyCodes?.[currencyCode as CurrencyCode]?.[currencySymbol] ?? ""
    : "";

  return (
    sign +
    currency +
    (currencySymbol === "code" ? " " : "") +
    Math.abs(formattedAmount).toLocaleString()
  );
};

export const calculateAutoSplitAmounts = (
  amount: number,
  transactions: CreateExpenseTransaction[],
) => {
  const autoSplitCount = transactions.filter((i) => i.isAutoSplit).length;

  const amountPaid = transactions
    .filter((i) => !i.isAutoSplit)
    .reduce((prev, curr) => prev + (curr?.amount ?? 0), 0);

  const autoSplitAmount =
    autoSplitCount === 0
      ? 0
      : Math.max(0, (amount - amountPaid) / autoSplitCount);
  const amountPerUser = transactions.map((i) => ({
    userId: i.userId,
    amount: i.isAutoSplit ? autoSplitAmount : i.amount ?? 0,
  }));

  const realAmountSum = amountPerUser.reduce(
    (prev, curr) => prev + curr.amount,
    0,
  );

  return {
    amountPerUser,
    isPaymentEqualExpense:
      roundAmountToDecimal(realAmountSum) === roundAmountToDecimal(amount),
  };
};
