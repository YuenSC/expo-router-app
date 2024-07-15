import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { usePatchExpenseUpdate } from "@/src/api/hooks/expense/usePatchExpenseUpdate";
import { usePostExpenseCreate } from "@/src/api/hooks/expense/usePostExpenseCreate";
import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import {
  CreateExpenseTransaction,
  ExpenseTransactionType,
  PostExpenseCreatePayload,
} from "@/src/api/types/Expense";
import { UseStepActions } from "@/src/hooks/useStep";

type ExpenseFormContextType = UseStepActions & {
  groupId: string;
  expenseId?: string;
  currentStep: number;
  resetTransactions: (type: ExpenseTransactionType) => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

const ExpenseFormContext = createContext<ExpenseFormContextType | undefined>(
  undefined,
);

export const ExpenseFormProvider = ({
  children,
  groupId,
  expenseId,
  ...props
}: PropsWithChildren<
  UseStepActions & {
    groupId: string;
    expenseId?: string;
    currentStep: number;
    onSuccess: () => void;
  }
>) => {
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
    },
  });

  const { setValue, getValues, handleSubmit } = form;

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

  const onSubmit: SubmitHandler<PostExpenseCreatePayload> = useCallback(
    async (values) => {
      console.log("onSubmit values", JSON.stringify(values, null, 2));
      if (expenseId) postExpenseUpdate({ id: expenseId, ...values });
      else postExpenseCreate(values);
    },
    [expenseId, postExpenseCreate, postExpenseUpdate],
  );

  return (
    <FormProvider {...form}>
      <ExpenseFormContext.Provider
        value={{
          ...props,
          groupId,
          resetTransactions,
          onSubmit: handleSubmit(onSubmit),
          isLoading: isPendingCreate || isPendingUpdate,
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
