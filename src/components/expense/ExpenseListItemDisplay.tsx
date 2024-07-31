import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";

import BillCategoryIcon from "./BillCategoryIcon";
import { HStack, VStack } from "../common/Stack";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { BillCategoryEnum } from "@/src/api/types/BillCategories";
import { Expense } from "@/src/api/types/Expense";
import { DataDisplayTarget } from "@/src/types/DataDisplayTarget";
import { calculateUserNetTransactionAmount } from "@/src/utils/calculateUserNetTransactionAmount";
import { formatDate } from "@/src/utils/formatDate";
import { formatAmount } from "@/src/utils/payments";

type IExpenseListItemDisplayProps = {
  expense: Expense;
  target: DataDisplayTarget;
};

const ExpenseListItemDisplay = memo<IExpenseListItemDisplayProps>(
  ({ expense, target }) => {
    const styles = useStyles();
    const { data: user } = useGetMe();

    const { netAmount } = calculateUserNetTransactionAmount(
      expense,
      user?.id || "",
    );

    const amount =
      target === DataDisplayTarget.Group ? expense.amount : netAmount;

    return (
      <HStack style={styles.container}>
        <HStack>
          {Object.values(BillCategoryEnum).includes(
            expense.category as BillCategoryEnum,
          ) && (
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
            Math.sign(amount) === -1 && styles.amountNegative,
            Math.sign(amount) === 1 && styles.amountPositive,
            target === DataDisplayTarget.Group && styles.whiteText,
          ]}
        >
          {formatAmount(amount, expense.currencyCode)}
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
  whiteText: {
    color: theme.colors.black,
  },
}));

ExpenseListItemDisplay.displayName = "ExpenseListItemDisplay";

export default ExpenseListItemDisplay;
