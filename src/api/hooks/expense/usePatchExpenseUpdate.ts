import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { patchExpenseUpdate } from "../../expense";
import {
  PatchExpenseUpdatePayload,
  PatchExpenseUpdateResponse,
} from "../../types/Expense";

export const usePatchExpenseUpdate = (
  options: Omit<
    UseMutationOptions<
      PatchExpenseUpdateResponse,
      Error,
      PatchExpenseUpdatePayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: patchExpenseUpdate,
    ...options,
  });

  return mutation;
};
