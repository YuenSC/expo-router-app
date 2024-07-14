import { Entypo } from "@expo/vector-icons";
import {
  Button,
  Input,
  ListItem,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

import { useExpenseFormContext } from "./ExpenseFormContext";
import { ExpensePageEnum } from "./ExpensePageEnum";
import StyledScrollView from "../common/StyledScrollView";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { PostExpenseCreatePayload } from "@/src/api/types/Expense";

const PayerPayeeSelectForm = ({
  route,
}: {
  route: { key: string; title: string };
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { groupId } = useExpenseFormContext();

  const { data: group } = useGetGroup({ id: groupId });

  const { control } = useFormContext<PostExpenseCreatePayload>();
  // const amountWatch = useWatch({ name: "amount", control });
  const transactions = useWatch({ name: "createExpenseTransactions", control });
  // const isEdit = Boolean(expenseId);

  // const { actualAmountPerUser, isPaymentEqualExpense } = useMemo(() => {
  //   return getActualAmountPerUser(amountWatch, paymentRecords);
  // }, [amountWatch, paymentRecords]);

  return (
    <View style={styles.container}>
      <StyledScrollView keyboardDismissMode="on-drag">
        <Text style={styles.label}>
          {route.key === ExpensePageEnum.payerSelect
            ? t("PayerPayeeSelectForm:who-paid")
            : t("PayerPayeeSelectForm:paid-for")}
        </Text>
        {(group?.users ?? []).map(({ isAdmin, user }) => {
          const index = transactions.findIndex((i) => i.userId === user.id);
          // const actualAmount = actualAmountPerUser.find(
          //   (i) => i.id === user.id,
          // )?.amount;

          return (
            <ListItem
              key={user.id}
              bottomDivider
              style={{ width: "100%" }}
              containerStyle={{ backgroundColor: "transparent" }}
            >
              <ListItem.CheckBox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={Boolean(transactions[index]?.amount)}
                onPress={() => {
                  // const paymentPerUsersCopy = [...transactions];
                  // paymentPerUsersCopy[index].amount = paymentPerUsersCopy[index]
                  //   .amount
                  //   ? 0
                  //   : "auto";
                  // setValue(type, paymentPerUsersCopy);
                }}
              />
              <ListItem.Content style={styles.itemContent}>
                <View style={styles.name}>
                  <ListItem.Title numberOfLines={1}>{user.name}</ListItem.Title>
                  {/* {paymentRecords[index].amount === "auto" && (
                    <Text style={styles.autoTag}>
                      {t("PayerPayeeSelectForm:auto-tag")}
                    </Text>
                  )} */}
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    renderErrorMessage={false}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholder="0"
                    // value={actualAmount === 0 ? "" : actualAmount?.toString()}
                    keyboardType="numeric"
                    // selection={{
                    //   start: (actualAmount ?? "")?.toString().length,
                    //   end: (actualAmount ?? "")?.toString().length,
                    // }}
                    onChangeText={(text) => {
                      // const paymentPerUsersCopy = [...transactions];
                      // const textAsNumber = parseFloat(text);
                      // paymentPerUsersCopy[index].amount = Number.isNaN(
                      //   textAsNumber,
                      // )
                      //   ? 0
                      //   : Math.min(
                      //       textAsNumber,
                      //       amountWatch -
                      //         actualAmountPerUser
                      //           .filter(({ id }) => id !== member.id)
                      //           .reduce((prev, curr) => prev + curr.amount, 0),
                      //     );
                      // setValue(type, paymentPerUsersCopy);
                    }}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          const paymentPerUsersCopy = [...transactions];
                          paymentPerUsersCopy[index].amount = 0;
                          // setValue(type, paymentPerUsersCopy);
                        }}
                      >
                        <Entypo
                          name="circle-with-cross"
                          size={20}
                          color={theme.colors.grey3}
                          style={{ marginLeft: 4 }}
                        />
                      </TouchableOpacity>
                    }
                  />
                </View>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </StyledScrollView>

      <View style={styles.footer}>
        <Button
          title={
            route.key === ExpensePageEnum.payerSelect
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
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  label: {
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
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: { textAlign: "right" },
  name: { flexDirection: "row", flex: 1, alignItems: "center" },
  autoTag: {
    fontSize: 12,
    paddingLeft: 4,
    color: theme.colors.grey3,
  },
}));

export default PayerPayeeSelectForm;
