import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { deleteUserInGroup } from "../../group";
import {
  DeleteUserInGroupPayload,
  DeleteUserInGroupResponse,
} from "../../types/Group";

export const useDeleteUserInGroup = (
  options: Omit<
    UseMutationOptions<
      DeleteUserInGroupResponse,
      Error,
      DeleteUserInGroupPayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: deleteUserInGroup,
    ...options,
  });

  return mutation;
};
