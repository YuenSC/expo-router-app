import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";

export interface User extends BaseObject {
  name: string;
  email: string;
  role: "user" | "admin";
  isOnboardingCompleted: boolean;
  lastLoginAt: string;
  imageUrl?: string;
}

export interface PatchUserUpdatePayload extends Partial<User> {
  id: string;
  profileImage: {
    uri: string;
    type?: string;
    name?: string;
  };
}
export type PatchUserUpdateResponse = ApiResponse<User>;

export interface GetUserPayload {
  id: string;
}
export type GetUserResponse = ApiResponse<User>;
