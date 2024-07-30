import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
// eslint-disable-next-line no-restricted-imports
import { Input as BaseInput } from "@rneui/base";
import { Button, Input, Text, makeStyles } from "@rneui/themed";
import { useRef } from "react";
import {
  Controller,
  useController,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BillCalculatorBottomSheetModal from "./BillCalculatorBottomSheetModal";
import BillCategoryIcon from "./BillCategoryIcon";
import { useExpenseFormContext } from "./ExpenseFormContext";
import CurrencyCodeSelectBottomSheetModal from "./ExpenseFormCurrencyCodeSelectBottomSheetModal";
import ExpenseFormDatePickerBottomSheetModal from "./ExpenseFormDatePickerBottomSheet";
import { VStack } from "../common/Stack";
import StyledScrollView from "../common/StyledScrollView";

import { BillCategoryEnum } from "@/src/api/types/BillCategories";
import { PostExpenseCreatePayload } from "@/src/api/types/Expense";
import { formatDate } from "@/src/utils/formatDate";

const ExpenseDetailForm = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const calculatorModalRef = useRef<BottomSheetModal>(null);
  const amountInputRef = useRef<TextInput & BaseInput>(null);
  const currencyCodeBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dateBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dateInputRef = useRef<TextInput & BaseInput>(null);
  const { t, i18n } = useTranslation();
  const { goToNextStep } = useExpenseFormContext();

  const { control, trigger } = useFormContext<PostExpenseCreatePayload>();
  const currencyCodeWatch = useWatch({ control, name: "currencyCode" });
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

  // const recordId = useWatch({ control, name: "id" });
  // const record = useAppSelector((state) =>
  //   state.groups.groups
  //     .find((group) => group.id === groupId)
  //     ?.paymentRecords.find((item) => item.id === recordId),
  // );

  return (
    <View style={styles.container}>
      <StyledScrollView
        style={styles.container}
        keyboardDismissMode="on-drag"
        onScrollBeginDrag={() => calculatorModalRef.current?.close()}
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
              <Text style={styles.currencyButtonText}>{currencyCodeWatch}</Text>
              <AntDesign name="caretdown" />
            </TouchableOpacity>
          }
          containerStyle={styles.inputContainer}
          showSoftInputOnFocus={false}
          value={amount.value === 0 ? undefined : amount.value.toLocaleString()}
          onFocus={calculatorModalRef.current?.present}
          onBlur={() => {
            calculatorModalRef.current?.close();
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
        <Text style={styles.label}>{t("BillForm:category")}</Text>
        <Controller
          name="category"
          control={control}
          defaultValue={BillCategoryEnum.Transportation}
          render={({ field: { value: category, onChange } }) => {
            return (
              <View style={styles.categoryGrid}>
                {Object.values(BillCategoryEnum).map((key) => {
                  const isActive = category === key;

                  return (
                    <VStack gap={2} key={key} style={styles.category}>
                      <TouchableOpacity
                        onPress={() => onChange(key)}
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
                    </VStack>
                  );
                })}
              </View>
            );
          }}
        />

        <Controller
          control={control}
          name="incurredOn"
          rules={{
            required: t("ExpenseDetailForm:date-is-required"),
          }}
          render={({ field: { value, onBlur }, fieldState: { error } }) => {
            return (
              <Input
                ref={dateInputRef}
                label={t("BillForm:date")}
                placeholder={t("BillForm:date-placeholder")}
                onFocus={() => dateBottomSheetModalRef.current?.present()}
                showSoftInputOnFocus={false}
                value={value ? formatDate(value, i18n.language) : undefined}
                onBlur={() => onBlur()}
                errorMessage={error?.message}
              />
            );
          }}
        />
      </StyledScrollView>

      <View style={styles.footer}>
        <Button
          title={t("Common:next")}
          onPress={async () => {
            if (await trigger(["amount", "description", "incurredOn"]))
              goToNextStep();
          }}
        />
      </View>

      {/* Modal */}
      <BillCalculatorBottomSheetModal
        ref={calculatorModalRef}
        value={amount.value}
        onChange={amount.onChange}
        onBlurInput={() => amountInputRef.current?.blur()}
      />

      <Controller
        name="currencyCode"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <CurrencyCodeSelectBottomSheetModal
              ref={currencyCodeBottomSheetModalRef}
              currencyCode={value}
              setCurrencyCode={onChange}
            />
          );
        }}
      />

      <ExpenseFormDatePickerBottomSheetModal
        ref={dateBottomSheetModalRef}
        onClose={() => dateInputRef.current?.blur()}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 8,
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
  footer: {
    position: "absolute",
    width: "100%",
    left: 8,
    padding: 16,
    bottom: 16,
  },

  categoryGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  category: {
    width: "25%",
    padding: 4,
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
}));

ExpenseDetailForm.displayName = "ExpenseDetailForm";

export default ExpenseDetailForm;
