import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { DeleteUserPayload, DeleteUserResponse } from "../../types/User";
import { deleteUser } from "../../user";

export const useDeleteUser = (
  options: Omit<
    UseMutationOptions<DeleteUserResponse, Error, DeleteUserPayload, unknown>,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: deleteUser,
    ...options,
  });

  return mutation;
};
