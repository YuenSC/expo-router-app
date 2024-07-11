import { useInfiniteQuery } from "@tanstack/react-query";

import { getExpenseList } from "../../expense";
import { getNextPageParam } from "../../helper/getNextPageParam";
import { ApiPaginatedPayload } from "../../types/Pagination";

export const useGetExpenseList = (payload: ApiPaginatedPayload) => {
  const query = useInfiniteQuery({
    queryKey: ["useGetExpenseList", payload],
    queryFn: async ({ pageParam }) => {
      return (await getExpenseList({ ...payload, page: pageParam })).data;
    },
    initialPageParam: 1,
    getNextPageParam,
  });

  const data = query.data?.pages.flatMap((page) => page.items) ?? [];
  return { data, query };
};
