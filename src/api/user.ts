import axios from "axios";

import toFormData from "./helper/toFormData";
import {
  PostUserCreatePayload,
  PostUserCreateResponse,
  GetUserPayload,
  GetUserResponse,
  PatchUserUpdatePayload,
  PatchUserUpdateResponse,
} from "./types/User";

export const getUser = async ({
  id,
}: GetUserPayload): Promise<GetUserResponse> => {
  return (await axios.get(`/api/users/${id}`)).data;
};

export const patchUserUpdate = async ({
  id,
  ...payload
}: PatchUserUpdatePayload): Promise<PatchUserUpdateResponse> => {
  return (await axios.patch(`/api/users/${id}`, toFormData(payload))).data;
};

export const postUserCreate = async (
  payload: PostUserCreatePayload,
): Promise<PostUserCreateResponse> => {
  return (await axios.post("/api/users", toFormData(payload))).data;
};
