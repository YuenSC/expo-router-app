import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { useNavigation } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { usePatchExpenseUpdate } from "@/src/api/hooks/expense/usePatchExpenseUpdate";
import { usePostExpenseCreate } from "@/src/api/hooks/expense/usePostExpenseCreate";
import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import {
  CreateExpenseTransaction,
  Expense,
  ExpenseTransactionType,
  PostExpenseCreatePayload,
} from "@/src/api/types/Expense";
import { UseStepActions } from "@/src/hooks/useStep";
import { calculateAutoSplitAmounts } from "@/src/utils/payments";

type ExpenseFormContextType = UseStepActions & {
  groupId: string;
  expenseId?: string;
  currentStep: number;
  resetTransactions: (type: ExpenseTransactionType) => void;
  onNextStepOrSubmit: () => void;
  isLoading?: boolean;
  transactionSummary: {
    payeeSummary: ReturnType<typeof calculateAutoSplitAmounts>;
    payerSummary: ReturnType<typeof calculateAutoSplitAmounts>;
  };
};

const ExpenseFormContext = createContext<ExpenseFormContextType | undefined>(
  undefined,
);

export const ExpenseFormProvider = ({
  children,
  groupId,
  expenseId,
  expense,
  setStep,
  goToNextStep,
  canGoToNextStep,
  onInValid,
  defaultValues,
  ...props
}: PropsWithChildren<
  UseStepActions & {
    groupId: string;
    expenseId?: string;
    expense?: Expense;
    currentStep: number;
    onSuccess: () => void;
    onInValid: () => void;
    defaultValues?: Partial<PostExpenseCreatePayload>;
  }
>) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const { data: group } = useGetGroup({ id: groupId || "" });
  const { data: profileUser } = useGetMe();
  const { mutate: postExpenseCreate, isPending: isPendingCreate } =
    usePostExpenseCreate({
      onSuccess: props.onSuccess,
    });
  const { mutate: postExpenseUpdate, isPending: isPendingUpdate } =
    usePatchExpenseUpdate({
      onSuccess: props.onSuccess,
    });

  const isLoading = isPendingCreate || isPendingUpdate;

  const {
    defaultTransactions,
    defaultPayeeTransactions,
    defaultPayerTransactions,
  } = useMemo(() => {
    if (!profileUser)
      return {
        defaultTransactions: [],
        defaultPayeeTransactions: [],
        defaultPayerTransactions: [],
      };

    const profileUserAsPayer = {
      isAutoSplit: true,
      type: ExpenseTransactionType.payer,
      userId: profileUser.id,
    } satisfies CreateExpenseTransaction;

    const allUsersAsPayee = (group?.users ?? []).map(({ user }) => ({
      isAutoSplit: true,
      type: ExpenseTransactionType.payee,
      userId: user.id,
    })) satisfies CreateExpenseTransaction[];

    return {
      defaultTransactions: [profileUserAsPayer, ...allUsersAsPayee],
      defaultPayeeTransactions: allUsersAsPayee,
      defaultPayerTransactions: [profileUserAsPayer],
    };
  }, [group?.users, profileUser]);

  const form = useForm<PostExpenseCreatePayload>({
    defaultValues: {
      description: "Example",
      amount: 1000,
      currencyCode: "HKD",
      incurredOn: new Date().toISOString(),
      createExpenseTransactions: defaultTransactions,
      groupId,
      ...defaultValues,
    },
  });
  const { setValue, getValues, handleSubmit, trigger, control, reset } = form;
  const amountWatch = useWatch({ name: "amount", control });
  const transactionsWatch = useWatch({
    name: "createExpenseTransactions",
    control,
  });

  const transactionSummary = useMemo(() => {
    const payerSummary = calculateAutoSplitAmounts(
      amountWatch,
      transactionsWatch.filter((i) => i.type === ExpenseTransactionType.payer),
    );

    const payeeSummary = calculateAutoSplitAmounts(
      amountWatch,
      transactionsWatch.filter((i) => i.type === ExpenseTransactionType.payee),
    );

    return {
      payeeSummary,
      payerSummary,
    };
  }, [amountWatch, transactionsWatch]);

  const resetTransactions = useCallback(
    (type: ExpenseTransactionType) => {
      const transactions = getValues("createExpenseTransactions");
      const unaffectedTransactions = transactions.filter(
        (t) => t.type !== type,
      );
      const defaultTransactions =
        type === ExpenseTransactionType.payer
          ? defaultPayerTransactions
          : defaultPayeeTransactions;

      setValue("createExpenseTransactions", [
        ...defaultTransactions,
        ...unaffectedTransactions,
      ]);
    },
    [defaultPayeeTransactions, defaultPayerTransactions, getValues, setValue],
  );

  const onSubmit = useCallback(async () => {
    const isFirstPageValid = await trigger([
      "amount",
      "description",
      "incurredOn",
    ]);
    const isSecondPageValid =
      transactionSummary.payerSummary.isPaymentEqualExpense;
    const isThirdPageValid =
      transactionSummary.payeeSummary.isPaymentEqualExpense;
    if (!isFirstPageValid) setStep(1);
    if (!isSecondPageValid) setStep(2);
    if (!isThirdPageValid) setStep(3);
    if (!isFirstPageValid || !isSecondPageValid || !isThirdPageValid) {
      onInValid();
      return;
    }
    handleSubmit((values) => {
      if (expense) postExpenseUpdate({ id: expense.id, ...values });
      else postExpenseCreate(values);
    })();
  }, [
    expense,
    handleSubmit,
    onInValid,
    postExpenseCreate,
    postExpenseUpdate,
    setStep,
    transactionSummary,
    trigger,
  ]);

  const onNextStepOrSubmit = useCallback(
    async () => (canGoToNextStep ? goToNextStep() : onSubmit()),
    [canGoToNextStep, goToNextStep, onSubmit],
  );

  useEffect(() => {
    if (expenseId && !expense) return;

    navigation.setOptions({
      headerRight: () =>
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={onSubmit}>
            <Ionicons name="create" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        ),
    });
  }, [
    expense,
    expenseId,
    isLoading,
    navigation,
    onNextStepOrSubmit,
    onSubmit,
    theme.colors.primary,
  ]);

  useEffect(() => {
    if (expense) {
      reset({
        description: expense.description,
        amount: expense.amount,
        currencyCode: expense.currencyCode,
        incurredOn: expense.incurredOn,
        createExpenseTransactions: expense.transactions,
        groupId,
      });
    }
  }, [expense, groupId, reset]);

  return (
    <FormProvider {...form}>
      <ExpenseFormContext.Provider
        value={{
          ...props,
          groupId,
          resetTransactions,
          onNextStepOrSubmit,
          isLoading,
          setStep,
          goToNextStep,
          canGoToNextStep,
          transactionSummary,
        }}
      >
        {children}
      </ExpenseFormContext.Provider>
    </FormProvider>
  );
};

export const useExpenseFormContext = () => {
  const context = useContext(ExpenseFormContext);
  if (!context) {
    throw new Error(
      "useExpenseFormContext must be used within an ExpenseFormProvider",
    );
  }
  return context;
};
