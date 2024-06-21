import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";

export interface User extends BaseObject {
  username: string;
  email: string;
  role: "user" | "admin";
  isOnboardingCompleted: boolean;
  lastLoginAt: string;
}

export interface PatchUserUpdatePayload extends Partial<User> {
  id: string;
  profileImage: File;
}
export type PatchUserUpdateResponse = ApiResponse<User>;

export interface GetUserPayload {
  id: string;
}
export type GetUserResponse = ApiResponse<User>;
