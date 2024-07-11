import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { deleteExpense } from "../../expense";
import {
  DeleteExpensePayload,
  DeleteExpenseResponse,
} from "../../types/Expense";

export const useDeleteExpense = (
  options: Omit<
    UseMutationOptions<
      DeleteExpenseResponse,
      Error,
      DeleteExpensePayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: deleteExpense,
    ...options,
  });

  return mutation;
};
