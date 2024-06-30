import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postGroupCreate } from "../../group";
import {
  PostGroupCreatePayload,
  PostGroupCreateResponse,
} from "../../types/Group";

export const usePostGroupCreate = (
  options: Omit<
    UseMutationOptions<
      PostGroupCreateResponse,
      Error,
      PostGroupCreatePayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postGroupCreate,
    ...options,
  });

  return mutation;
};
