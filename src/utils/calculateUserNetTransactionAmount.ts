import { calculateAutoSplitAmounts } from "./payments";
import { Expense, ExpenseTransactionType } from "../api/types/Expense";

export const calculateUserNetTransactionAmount = (
  expense?: Expense,
  userId?: string,
) => {
  if (!userId || !expense)
    return {
      paidAmount: 0,
      receivedAmount: 0,
      netAmount: 0,
      currencyCode: expense?.currencyCode,
    };

  let paidAmount = 0;
  let receivedAmount = 0;

  const payerTransactions = expense.transactions.filter(
    (t) => t.type === ExpenseTransactionType.payer,
  );
  const payeeTransactions = expense.transactions.filter(
    (t) => t.type === ExpenseTransactionType.payee,
  );

  if (payerTransactions) {
    const { amountPerUser: payerAutoSplitAmounts } = calculateAutoSplitAmounts(
      expense.amount,
      payerTransactions,
    );
    paidAmount =
      payerAutoSplitAmounts.find((i) => i.userId === userId)?.amount ?? 0;
  }

  if (payeeTransactions) {
    const { amountPerUser: payeeAutoSplitAmounts } = calculateAutoSplitAmounts(
      expense.amount,
      payeeTransactions,
    );
    receivedAmount =
      payeeAutoSplitAmounts.find((i) => i.userId === userId)?.amount ?? 0;
  }

  return {
    paidAmount,
    receivedAmount,
    netAmount: paidAmount - receivedAmount,
    currencyCode: expense.currencyCode,
  };
};
