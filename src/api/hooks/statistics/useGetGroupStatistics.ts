import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getGroupStatistics } from "../../statistics";
import {
  GetGroupStatisticsPayload,
  GetGroupStatisticsResponse,
} from "../../types/Statistics";

export const useGetGroupStatistics = (
  payload: GetGroupStatisticsPayload,
  options?: Omit<
    UseQueryOptions<GetGroupStatisticsResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  const query = useQuery({
    queryKey: ["useGetGroupStatistics", payload],
    queryFn: () => getGroupStatistics(payload),
    enabled: !!payload.groupId,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
