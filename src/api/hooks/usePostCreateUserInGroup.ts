import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postCreateUserInGroup } from "../group";
import {
  PostCreateUserInGroupPayload,
  PostCreateUserInGroupResponse,
} from "../types/Group";

export const usePostCreateUserInGroup = (
  options: Omit<
    UseMutationOptions<
      PostCreateUserInGroupResponse,
      Error,
      PostCreateUserInGroupPayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postCreateUserInGroup,
    ...options,
  });

  return mutation;
};
