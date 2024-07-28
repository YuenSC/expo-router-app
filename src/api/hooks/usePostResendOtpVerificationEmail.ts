import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postResendOtpVerificationEmail } from "../auth";
import {
  PostResendOtpVerificationEmailPayload,
  PostResendOtpVerificationEmailResponse,
} from "../types/Otp";

export const usePostResendOtpVerificationEmail = (
  options: Omit<
    UseMutationOptions<
      PostResendOtpVerificationEmailResponse,
      Error,
      PostResendOtpVerificationEmailPayload,
      unknown
    >,
    "mutationFn"
  >,
) => {
  const mutation = useMutation({
    mutationFn: postResendOtpVerificationEmail,
    ...options,
  });

  return mutation;
};
