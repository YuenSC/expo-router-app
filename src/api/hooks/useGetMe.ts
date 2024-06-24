import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getMe } from "../auth";
import { GetUserResponse } from "../types/User";

export const useGetMe = (
  options?: Omit<UseQueryOptions<GetUserResponse>, "queryKey" | "queryFn">,
) => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
