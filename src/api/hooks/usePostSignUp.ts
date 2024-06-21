import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postSignUp } from "../auth";
import { PostSignUpPayload, PostSignUpResponse } from "../types/SignUp";

export const usePostSignUp = (
  options: Omit<
    UseMutationOptions<PostSignUpResponse, Error, PostSignUpPayload, unknown>,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postSignUp,
    ...options,
  });

  return mutation;
};
