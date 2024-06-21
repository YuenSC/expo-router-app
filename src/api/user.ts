import axios, { toFormData } from "axios";

import {
  GetUserPayload,
  GetUserResponse,
  PatchUserUpdatePayload,
  PatchUserUpdateResponse,
} from "./types/User";

export const patchUserUpdate = async ({
  id,
  ...payload
}: PatchUserUpdatePayload): Promise<PatchUserUpdateResponse> => {
  return (await axios.patch(`/api/user/${id}`, toFormData(payload))).data;
};

export const getUser = async ({
  id,
}: GetUserPayload): Promise<GetUserResponse> => {
  return (await axios.get(`/api/users/${id}`)).data;
};
