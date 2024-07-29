import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";

import BillCategoryIcon from "./BillCategoryIcon";
import { HStack, VStack } from "../common/Stack";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { BillCategoryEnum } from "@/src/api/types/BillCategories";
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
        <HStack>
          {expense.category && (
            <HStack style={styles.categoryIcon} justifyContent="center">
              <BillCategoryIcon
                category={expense.category as BillCategoryEnum}
              />
            </HStack>
          )}
          <VStack alignItems="flex-start" gap={4}>
            <Text style={styles.name}>{expense.description}</Text>
            <Text>Incurred On: {formatDate(expense.incurredOn)}</Text>
          </VStack>
        </HStack>

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
  categoryIcon: {
    width: 40,
    height: 40,
    marginLeft: -8,
  },
}));

ExpenseListItemDisplay.displayName = "ExpenseListItemDisplay";

export default ExpenseListItemDisplay;
