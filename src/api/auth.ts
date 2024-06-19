import axios from "axios";

import { PostLoginPayload, PostLoginResponse } from "./types/Login";
import { PostSignUpPayload, PostSignUpResponse } from "./types/SignUp";

export const postLogin = async (
  payload: PostLoginPayload,
): Promise<PostLoginResponse> => {
  return (await axios.post("/api/auth/login", payload)).data;
};

export const postSignUp = async (
  payload: PostSignUpPayload,
): Promise<PostSignUpResponse> => {
  return (await axios.post("/api/auth/sign-up", payload)).data;
};
