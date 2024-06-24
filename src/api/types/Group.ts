import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";

export interface Group extends BaseObject {
  name: string;
  description: string;
  createdBy: string;
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
