import axios from "axios";

import { setAxiosToken } from "./axios";
import { ApiResponse } from "./types/ApiResponse";
import { PostLoginPayload, PostLoginResponse } from "./types/Login";
import {
  PostOtpVerifyEmailPayload,
  PostOtpVerifyEmailResponse,
  PostResendOtpVerificationEmailPayload,
  PostResendOtpVerificationEmailResponse,
} from "./types/Otp";
import { PostSignUpPayload, PostSignUpResponse } from "./types/SignUp";
import { User } from "./types/User";

export const postLogin = async (
  payload: PostLoginPayload,
): Promise<PostLoginResponse> => {
  const { data } = await axios.post("/api/auth/login", payload);
  setAxiosToken(data.data.access_token);
  return data;
};

export const postSignUp = async (
  payload: PostSignUpPayload,
): Promise<PostSignUpResponse> => {
  const { data } = await axios.post("/api/auth/sign-up", payload);
  setAxiosToken(data.data.access_token);
  return data;
};

export const postOtpVerifyEmail = async (
  payload: PostOtpVerifyEmailPayload,
): Promise<PostOtpVerifyEmailResponse> => {
  const { data } = await axios.post("/api/auth/verify-email", payload);
  return data;
};

export const postResendOtpVerificationEmail = async (
  payload: PostResendOtpVerificationEmailPayload,
): Promise<PostResendOtpVerificationEmailResponse> => {
  const { data } = await axios.post(
    "/api/auth/resend-verification-email",
    payload,
  );
  return data;
};

export const getMe = async (): Promise<ApiResponse<User>> => {
  return (await axios.get("/api/auth/me")).data;
};
