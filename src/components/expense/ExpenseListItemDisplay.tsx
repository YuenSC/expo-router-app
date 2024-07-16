import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";

import { HStack, VStack } from "../common/Stack";

import { Expense } from "@/src/api/types/Expense";
import { formatDate } from "@/src/utils/formatDate";
import { formatAmount } from "@/src/utils/payments";

type IExpenseListItemDisplayProps = {
  expense: Expense;
};

const ExpenseListItemDisplay = memo<IExpenseListItemDisplayProps>(
  ({ expense }) => {
    const styles = useStyles();

    console.log("expense", JSON.stringify(expense, null, 2));

    return (
      <HStack style={styles.container}>
        <VStack alignItems="flex-start" gap={4}>
          <Text style={styles.name}>{expense.description}</Text>
          <Text>{formatDate(expense.incurredOn)}</Text>
        </VStack>
        <Text style={styles.amount}>
          {formatAmount(expense.amount, expense.currencyCode)}
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
    color: theme.colors.primary,
  },
}));

ExpenseListItemDisplay.displayName = "ExpenseListItemDisplay";

export default ExpenseListItemDisplay;
