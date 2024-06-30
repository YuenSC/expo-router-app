import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import {
  PatchUserUpdatePayload,
  PatchUserUpdateResponse,
} from "../../types/User";
import { patchUserUpdate } from "../../user";

export const usePatchUserUpdate = (
  options: Omit<
    UseMutationOptions<
      PatchUserUpdateResponse,
      Error,
      PatchUserUpdatePayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: patchUserUpdate,
    ...options,
  });

  return mutation;
};
