import { useInfiniteQuery } from "@tanstack/react-query";

import { getGroupList } from "../../group";
import { getNextPageParam } from "../../helper/getNextPageParam";
import { ApiPaginatedPayload } from "../../types/Pagination";

export const useGetGroupList = (payload: ApiPaginatedPayload) => {
  const query = useInfiniteQuery({
    queryKey: ["useGetGroupList", payload],
    queryFn: async ({ pageParam }) => {
      return (await getGroupList({ ...payload, page: pageParam })).data;
    },
    initialPageParam: 1,
    getNextPageParam,
  });

  const data = query.data?.pages.flatMap((page) => page.items) ?? [];
  return { data, query };
};
