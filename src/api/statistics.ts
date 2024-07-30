import axios from "axios";

import {
  GetGroupStatisticsPayload,
  GetGroupStatisticsResponse,
} from "./types/Statistics";

export const getGroupStatistics = async ({
  groupId,
}: GetGroupStatisticsPayload): Promise<GetGroupStatisticsResponse> => {
  return (await axios.get(`/api/groups/${groupId}/statistics`)).data;
};
