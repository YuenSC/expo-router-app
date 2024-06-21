import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postLogin } from "../auth";
import { PostLoginPayload, PostLoginResponse } from "../types/Login";

export const usePostLogin = (
  options: Omit<
    UseMutationOptions<PostLoginResponse, Error, PostLoginPayload, unknown>,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postLogin,
    ...options,
  });

  return mutation;
};
