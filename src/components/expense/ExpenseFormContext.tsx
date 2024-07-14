import { createContext, PropsWithChildren, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { PostExpenseCreatePayload } from "@/src/api/types/Expense";
import { UseStepActions } from "@/src/hooks/useStep";

type ExpenseFormContextType = UseStepActions & {
  groupId: string;
};

const ExpenseFormContext = createContext<ExpenseFormContextType | undefined>(
  undefined,
);

export const ExpenseFormProvider = ({
  children,
  ...props
}: PropsWithChildren<ExpenseFormContextType>) => {
  const form = useForm<PostExpenseCreatePayload>({
    defaultValues: {
      description: "Example",
      amount: 1000,
      currencyCode: "HKD",
      incurredOn: new Date().toISOString(),
    },
  });

  return (
    <FormProvider {...form}>
      <ExpenseFormContext.Provider value={props}>
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
