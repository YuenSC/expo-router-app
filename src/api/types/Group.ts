import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";
import { User } from "./User";

export interface Group extends BaseObject {
  name: string;
  description: string;
  createdBy: string;
  users?: { user: User; isAdmin: boolean }[];
}

export type PostGroupCreatePayload = {
  name: string;
  description: string;
};
export type PostGroupCreateResponse = ApiResponse<Group>;

export interface GetGroupPayload {
  id: string;
}
export type GetGroupResponse = ApiResponse<Group>;

export interface DeleteGroupPayload {
  id: string;
}
export type DeleteGroupResponse = ApiResponse<unknown>;

export interface PostCreateUserInGroupPayload {
  groupId: string;
  name: string;
}
export type PostCreateUserInGroupResponse = ApiResponse<User>;

export interface DeleteUserInGroupPayload {
  groupId: string;
  userId: string;
}
export type DeleteUserInGroupResponse = ApiResponse<unknown>;

export interface PatchGroupUpdatePayload {
  id: string;
  name?: string;
  description?: string;
}
export type PatchGroupUpdateResponse = ApiResponse<Group>;
