import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postOtpVerifyEmail } from "../auth";
import {
  PostOtpVerifyEmailPayload,
  PostOtpVerifyEmailResponse,
} from "../types/Otp";

export const usePostOtpVerifyEmail = (
  options: Omit<
    UseMutationOptions<
      PostOtpVerifyEmailResponse,
      Error,
      PostOtpVerifyEmailPayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postOtpVerifyEmail,
    ...options,
  });

  return mutation;
};
