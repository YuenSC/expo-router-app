import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";

export enum UserRole {
  User = "user",
  Admin = "admin",
}

export interface User extends BaseObject {
  name: string;
  email: string;
  role: UserRole;
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

export interface PostUserCreatePayload {
  name: string;
  role: UserRole;
  profileImage?: {
    uri: string;
    type?: string;
    name?: string;
  };
}
export type PostUserCreateResponse = ApiResponse<User>;
