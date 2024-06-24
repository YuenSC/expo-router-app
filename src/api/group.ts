import axios from "axios";

import {
  GetGroupPayload,
  GetGroupResponse,
  PostGroupCreatePayload,
  PostGroupCreateResponse,
} from "./types/Group";

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
