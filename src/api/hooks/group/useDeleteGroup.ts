import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { deleteGroup } from "../../group";
import { DeleteGroupPayload, DeleteGroupResponse } from "../../types/Group";

export const useDeleteGroup = (
  options: Omit<
    UseMutationOptions<DeleteGroupResponse, Error, DeleteGroupPayload, unknown>,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: deleteGroup,
    ...options,
  });

  return mutation;
};
