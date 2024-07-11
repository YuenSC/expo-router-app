import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postExpenseCreate } from "../../expense";
import {
  PostExpenseCreatePayload,
  PostExpenseCreateResponse,
} from "../../types/Expense";

export const usePostExpenseCreate = (
  options: Omit<
    UseMutationOptions<
      PostExpenseCreateResponse,
      Error,
      PostExpenseCreatePayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postExpenseCreate,
    ...options,
  });

  return mutation;
};
