import { ApiResponse } from "./ApiResponse";
import { User } from "./User";

export interface PostLoginPayload {
  email: string;
  password: string;
}

export type PostLoginResponse = ApiResponse<{
  user: User;
  access_token: string;
}>;
