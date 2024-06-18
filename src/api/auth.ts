import axios from "axios";
import { PostLoginPayload, PostLoginResponse } from "./types/Login";

export const postLogin = async (
  payload: PostLoginPayload
): Promise<PostLoginResponse> => {
  return (await axios.post("/api/auth/login", payload)).data;
};
