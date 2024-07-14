import { AntDesign } from "@expo/vector-icons";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
// eslint-disable-next-line no-restricted-imports
import { Input as BaseInput } from "@rneui/base";
import { Button, Input, Text, makeStyles } from "@rneui/themed";
import { useImperativeHandle, useRef } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BillCalculatorBottomSheet from "./BillCalculatorBottomSheet";
import { useExpenseFormContext } from "./ExpenseFormContext";
import CurrencyCodeSelectBottomSheetModal from "./ExpenseFormCurrencyCodeSelectBottomSheetModal";
import StyledScrollView from "../common/StyledScrollView";

import { PostExpenseCreatePayload } from "@/src/api/types/Expense";
import { formatDate } from "@/src/utils/formatDate";

const ExpenseDetailForm = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const calculatorRef = useRef<BottomSheet>(null);
  const amountInputRef = useRef<TextInput & BaseInput>(null);
  const currencyCodeBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dateInputRef = useRef<TextInput & BaseInput>(null);
  const { t, i18n } = useTranslation();
  const { groupId, goToNextStep } = useExpenseFormContext();

  const { control } = useFormContext<PostExpenseCreatePayload>();

  console.log("groupId", groupId);
  // const recordId = useWatch({ control, name: "id" });
  // const record = useAppSelector((state) =>
  //   state.groups.groups
  //     .find((group) => group.id === groupId)
  //     ?.paymentRecords.find((item) => item.id === recordId),
  // );

  const {
    field: amount,
    fieldState: { error: amountError },
  } = useController({
    name: "amount",
    control,
    rules: {
      required: t("BillForm:amount-is-required"),
      min: {
        value: 1,
        message: t("BillForm:amount-is-required"),
      },
    },
  });

  const { field: currencyCode } = useController({
    name: "currencyCode",
    control,
  });
  const { field: date } = useController({
    name: "incurredOn",
    control,
  });
  // const { field: category } = useController({
  //   name: "category",
  //   control,
  // });
  useImperativeHandle(amount.ref, () => amountInputRef.current, []);

  return (
    <View style={styles.container}>
      <StyledScrollView
        style={styles.container}
        keyboardDismissMode="on-drag"
        onScrollBeginDrag={() => calculatorRef.current?.close()}
      >
        {/* Bill */}
        <Input
          ref={amountInputRef}
          label={t("BillForm:amount-label")}
          placeholder={t("BillForm:amount-placeholder")}
          style={styles.input}
          selection={{
            start: amount.value.toLocaleString().length,
            end: amount.value.toLocaleString().length,
          }}
          errorMessage={amountError?.message}
          leftIcon={
            <TouchableOpacity
              style={styles.currencyButton}
              onPress={() => currencyCodeBottomSheetModalRef.current?.present()}
            >
              <Text style={styles.currencyButtonText}>
                {currencyCode.value}
              </Text>
              <AntDesign name="caretdown" />
            </TouchableOpacity>
          }
          containerStyle={styles.inputContainer}
          showSoftInputOnFocus={false}
          value={amount.value === 0 ? undefined : amount.value.toLocaleString()}
          onFocus={() => calculatorRef.current?.snapToIndex(0)}
          onBlur={() => {
            calculatorRef.current?.close();
            amount.onBlur();
          }}
        />

        {/* Comment and Date */}
        <Controller
          control={control}
          rules={{ required: t("BillForm:comment-is-required") }}
          name="description"
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => {
            return (
              <Input
                ref={ref}
                errorMessage={error?.message}
                value={value}
                label={t("BillForm:comment-label")}
                placeholder={t("BillForm:comment-placeholder")}
                onChangeText={onChange}
              />
            );
          }}
        />

        {/* Category */}
        {/* <Text style={styles.label}>{t("BillForm:category")}</Text> */}
        {/* <View style={styles.categoryGrid}>
          {Object.values(BillCategoryEnum).map((key) => {
            const isActive = category.value === key;

            return (
              <View key={key} style={styles.category}>
                <TouchableOpacity
                  onPress={() => category.onChange(key)}
                  activeOpacity={0.8}
                  style={[
                    styles.categoryButton,
                    isActive && styles.categoryButtonActive,
                  ]}
                >
                  <BillCategoryIcon
                    category={key as BillCategoryEnum}
                    color="white"
                  />
                </TouchableOpacity>
                <Text style={styles.categoryText}>
                  {t(`BillCategoryEnum:${key}`)}
                </Text>
              </View>
            );
          })}
        </View> */}

        <Input
          ref={dateInputRef}
          label={t("BillForm:date")}
          placeholder={t("BillForm:date-placeholder")}
          onFocus={() => {
            // navigation.navigate("PaymentFormDatePickerBottomSheet", {
            //   date: date.value,
            //   setDate: date.onChange,
            // });
          }}
          showSoftInputOnFocus={false}
          value={date.value ? formatDate(date.value, i18n.language) : undefined}
          onBlur={() => {
            date.onBlur();
          }}
        />
      </StyledScrollView>

      <View style={styles.footer}>
        <Button
          title={t("Common:next")}
          // onPress={handleSubmit(() => {
          //   navigation.navigate("PayerSelect");
          // })}
          onPress={goToNextStep}
        />
      </View>

      {/* Modal */}
      <BillCalculatorBottomSheet
        ref={calculatorRef}
        value={amount.value}
        onChange={amount.onChange}
        onBlurInput={() => amountInputRef.current?.blur()}
        // defaultValue={record?.amount}
      />

      <CurrencyCodeSelectBottomSheetModal
        ref={currencyCodeBottomSheetModalRef}
        currencyCode={currencyCode.value}
        setCurrencyCode={currencyCode.onChange}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 8,
    paddingTop: 16,
  },
  input: {
    paddingLeft: 8,
    textAlign: "right",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    flex: 1,
  },
  currencyButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  currencyButtonText: { fontSize: 24, fontWeight: "bold" },
  billInputContainer: {
    flexDirection: "row",
  },

  categoryGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  category: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    gap: 2,
  },
  categoryButton: {
    padding: 16,
    backgroundColor: theme.colors.grey4,
    borderRadius: 16,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 12,
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
}));

ExpenseDetailForm.displayName = "ExpenseDetailForm";

export default ExpenseDetailForm;
