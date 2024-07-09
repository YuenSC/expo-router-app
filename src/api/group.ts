import axios from "axios";
import queryString from "query-string";

import {
  DeleteUserInGroupPayload,
  DeleteUserInGroupResponse,
  GetGroupPayload,
  GetGroupResponse,
  Group,
  PatchGroupUpdatePayload,
  PatchGroupUpdateResponse,
  PostCreateUserInGroupPayload,
  PostCreateUserInGroupResponse,
  PostGroupCreatePayload,
  PostGroupCreateResponse,
} from "./types/Group";
import { ApiPaginatedPayload, ApiPaginatedResponse } from "./types/Pagination";

export const postGroupCreate = async (
  payload: PostGroupCreatePayload,
): Promise<PostGroupCreateResponse> => {
  return (await axios.post(`/api/groups`, payload)).data;
};

export const getGroup = async ({
  id,
}: GetGroupPayload): Promise<GetGroupResponse> => {
  return (await axios.get(`/api/groups/${id}`)).data;
};

export const getGroupList = async (
  payload: ApiPaginatedPayload,
): Promise<ApiPaginatedResponse<Group>> => {
  return (await axios.get(`/api/groups?${queryString.stringify(payload)}`))
    .data;
};

export const patchGroupUpdate = async ({
  id,
  ...payload
}: PatchGroupUpdatePayload): Promise<PatchGroupUpdateResponse> => {
  return (await axios.patch(`/api/groups/${id}`, payload)).data;
};

export const postCreateUserInGroup = async ({
  groupId,
  ...payload
}: PostCreateUserInGroupPayload): Promise<PostCreateUserInGroupResponse> => {
  return (await axios.post(`/api/groups/${groupId}/users/create-user`, payload))
    .data;
};

export const deleteUserInGroup = async ({
  groupId,
  userId,
}: DeleteUserInGroupPayload): Promise<DeleteUserInGroupResponse> => {
  return (await axios.delete(`/api/groups/${groupId}/users/${userId}`)).data;
};
