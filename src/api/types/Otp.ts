import { ApiResponse } from "./ApiResponse";
import { User } from "./User";

export interface PostOtpVerifyEmailPayload {
  email: string;
  otp: string;
}

export type PostOtpVerifyEmailResponse = ApiResponse<{
  user: User;
  message: string;
  access_token: string;
}>;

export interface PostResendOtpVerificationEmailPayload {
  email: string;
}

export type PostResendOtpVerificationEmailResponse = ApiResponse<{
  user: User;
  message: string;
  access_token: string;
}>;
