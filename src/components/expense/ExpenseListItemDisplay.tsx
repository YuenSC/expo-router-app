import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";

import { HStack, VStack } from "../common/Stack";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { Expense } from "@/src/api/types/Expense";
import { calculateUserNetTransactionAmount } from "@/src/utils/calculateUserNetTransactionAmount";
import { formatDate } from "@/src/utils/formatDate";
import { formatAmount } from "@/src/utils/payments";

type IExpenseListItemDisplayProps = {
  expense: Expense;
};

const ExpenseListItemDisplay = memo<IExpenseListItemDisplayProps>(
  ({ expense }) => {
    const styles = useStyles();
    const { data: user } = useGetMe();

    const { netAmount } = calculateUserNetTransactionAmount(
      expense,
      user?.id || "",
    );

    return (
      <HStack style={styles.container}>
        <VStack alignItems="flex-start" gap={4}>
          <Text style={styles.name}>{expense.description}</Text>
          <Text>Incurred On: {formatDate(expense.incurredOn)}</Text>
        </VStack>
        <Text
          style={[
            styles.amount,
            Math.sign(netAmount) === -1 && styles.amountNegative,
            Math.sign(netAmount) === 1 && styles.amountPositive,
          ]}
        >
          {formatAmount(netAmount, expense.currencyCode)}
        </Text>
      </HStack>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: 8,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: theme.colors.black,
  },
  amountNegative: {
    color: theme.colors.error,
  },
  amountPositive: {
    color: theme.colors.success,
  },
}));

ExpenseListItemDisplay.displayName = "ExpenseListItemDisplay";

export default ExpenseListItemDisplay;
