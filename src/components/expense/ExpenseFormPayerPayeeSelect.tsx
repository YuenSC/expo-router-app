import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Button, ListItem, Text, makeStyles, useTheme } from "@rneui/themed";
import { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

import { useExpenseFormContext } from "./ExpenseFormContext";
import ExpenseFormPayerPayeeSelectInput from "./ExpenseFormPayerPayeeSelectInput";
import { ExpensePageEnum } from "./ExpensePageEnum";
import ProfileImageDisplay from "../User/ProfileImageDisplay";
import { HStack, VStack } from "../common/Stack";
import StyledScrollView from "../common/StyledScrollView";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import {
  ExpenseTransactionType,
  PostExpenseCreatePayload,
} from "@/src/api/types/Expense";
import { getActualAmountPerUser } from "@/src/utils/payments";

const PayerPayeeSelectForm = ({
  route,
}: {
  route: { key: string; title: string };
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { groupId, resetTransactions } = useExpenseFormContext();

  const { data: group } = useGetGroup({ id: groupId });

  const { control } = useFormContext<PostExpenseCreatePayload>();
  const amountWatch = useWatch({ name: "amount", control });
  const {
    append,
    update,
    fields: transactions,
  } = useFieldArray({
    control,
    name: "createExpenseTransactions",
  });

  const { amountPerUser, isPaymentEqualExpense } = useMemo(() => {
    return getActualAmountPerUser(
      amountWatch,
      transactions.filter((i) => i.type === route.key),
    );
  }, [amountWatch, route.key, transactions]);

  const toggleUserAutoSplit = (checked: boolean, userId: string) => {
    const index = transactions.findIndex(
      (i) => i.userId === userId && i.type === route.key,
    );
    if (!checked && index === -1) {
      return append({
        type: route.key as ExpenseTransactionType,
        isAutoSplit: true,
        userId,
      });
    }

    const isAutoSplit = !checked;
    update(index, {
      ...transactions[index],
      isAutoSplit,
      amount: undefined,
    });
  };

  const onRemoveUserAmount = (userId: string) => {
    const index = transactions.findIndex(
      (i) => i.userId === userId && i.type === route.key,
    );
    if (index === -1) return;
    update(index, {
      ...transactions[index],
      isAutoSplit: false,
      amount: 0,
    });
  };

  return (
    <View style={styles.container}>
      <StyledScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
      >
        <HStack>
          <Text style={styles.title}>
            {route.key === ExpensePageEnum.payer
              ? t("PayerPayeeSelectForm:who-paid")
              : t("PayerPayeeSelectForm:paid-for")}
          </Text>

          <TouchableOpacity
            onPress={() =>
              resetTransactions(route.key as ExpenseTransactionType)
            }
            style={{ marginRight: 12 }}
          >
            <HStack>
              <MaterialIcons
                name="refresh"
                size={24}
                color={theme.colors.secondary}
              />
              <Text style={{ color: theme.colors.secondary }}>
                {t("ExpenseFormPayerPayeeSelect:default")}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        {(group?.users ?? []).map(({ user }) => {
          const index = transactions.findIndex(
            (i) => i.userId === user.id && i.type === route.key,
          );
          const actualAmount = amountPerUser.find(
            (i) => i.userId === user.id,
          )?.amount;
          const checked = Boolean(
            transactions[index]?.amount || transactions[index]?.isAutoSplit,
          );

          return (
            <ListItem
              key={user.id}
              bottomDivider
              style={{ width: "100%" }}
              containerStyle={{ backgroundColor: "transparent", height: 70 }}
            >
              <ListItem.CheckBox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={checked}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => toggleUserAutoSplit(checked, user.id)}
              />
              <ListItem.Content style={styles.listItem}>
                <HStack
                  gap={8}
                  style={styles.listItemLeft}
                  justifyContent="flex-start"
                >
                  {user.imageUrl && (
                    <ProfileImageDisplay imageUrl={user.imageUrl} size={42} />
                  )}
                  <VStack alignItems="flex-start">
                    <ListItem.Title>{user.name}</ListItem.Title>
                    {transactions[index]?.isAutoSplit && (
                      <Text style={styles.autoTag}>
                        {t("PayerPayeeSelectForm:auto-tag")}
                      </Text>
                    )}
                  </VStack>
                </HStack>
                <ExpenseFormPayerPayeeSelectInput
                  amount={actualAmount}
                  maxAmount={amountWatch}
                  setAmount={(amount) => {
                    if (index === -1) {
                      append({
                        isAutoSplit: false,
                        amount,
                        type: route.key as ExpenseTransactionType,
                        userId: user.id,
                      });
                      return;
                    }
                    update(index, {
                      ...transactions[index],
                      amount,
                      isAutoSplit: false,
                    });
                  }}
                />
                <TouchableOpacity
                  style={{ marginLeft: 12 }}
                  hitSlop={{ top: 10, bottom: 10, right: 10 }}
                  onPress={() => onRemoveUserAmount(user.id)}
                >
                  <Entypo
                    name="circle-with-cross"
                    size={20}
                    color={theme.colors.grey3}
                  />
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </StyledScrollView>

      <View style={styles.footer}>
        <Button
          disabled={!isPaymentEqualExpense}
          title={
            route.key === ExpensePageEnum.payer
              ? t("Common:next")
              : t("Common:done")
          }
          // disabled={!isPaymentEqualExpense}
          // onPress={handleSubmit((values) => {
          //   switch (type) {
          //     case "payers":
          //       navigation.navigate("PayeeSelect");
          //       break;
          //     case "payees":
          //       if (isEdit) {
          //         dispatch(updatePaymentRecord(values as PaymentRecord));
          //       } else {
          //         dispatch(addPaymentRecord(values));
          //       }
          //       navigation.dispatch(StackActions.pop());
          //       break;
          //   }
          // })}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 12,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.grey3,
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    width: "100%",
    left: 8,
    padding: 16,
    bottom: 16,
  },
  listItemLeft: { flex: 1 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  autoTag: {
    fontSize: 12,
    color: theme.colors.grey3,
  },
}));

export default PayerPayeeSelectForm;
