import { ApiResponse } from "./ApiResponse";
import { User } from "./User";

export interface PostSignUpPayload {
  email: string;
  password: string;
  retypedPassword: string;
}

export type PostSignUpResponse = ApiResponse<{
  user: User;
}>;
