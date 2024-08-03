import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getGroup } from "../../group";
import { GetGroupPayload, GetGroupResponse } from "../../types/Group";

export const useGetGroup = (
  payload: GetGroupPayload,
  options?: Omit<UseQueryOptions<GetGroupResponse>, "queryKey" | "queryFn">,
) => {
  const query = useQuery({
    queryKey: ["group", payload],
    queryFn: () => getGroup(payload),
    enabled: !!payload.id,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
