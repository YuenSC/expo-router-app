import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { patchGroupUpdate } from "../group";
import {
  PatchGroupUpdatePayload,
  PatchGroupUpdateResponse,
} from "../types/Group";

export const usePatchGroupUpdate = (
  options: Omit<
    UseMutationOptions<
      PatchGroupUpdateResponse,
      Error,
      PatchGroupUpdatePayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: patchGroupUpdate,
    ...options,
  });

  return mutation;
};
