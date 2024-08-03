import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GetUserPayload, GetUserResponse } from "../../types/User";
import { getUser } from "../../user";

export const useGetUser = (
  payload: GetUserPayload,
  options?: Omit<UseQueryOptions<GetUserResponse>, "queryKey" | "queryFn">,
) => {
  const query = useQuery({
    queryKey: ["user", payload],
    queryFn: () => getUser(payload),
    enabled: !!payload.id,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
