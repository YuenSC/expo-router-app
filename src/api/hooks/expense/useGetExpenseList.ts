import { useInfiniteQuery } from "@tanstack/react-query";

import { getExpenseList } from "../../expense";
import { getNextPageParam } from "../../helper/getNextPageParam";
import { GetExpenseListPayload } from "../../types/Expense";

export const useGetExpenseList = (payload: GetExpenseListPayload) => {
  const query = useInfiniteQuery({
    queryKey: ["useGetExpenseList", payload],
    queryFn: async ({ pageParam }) => {
      return (await getExpenseList({ ...payload, page: pageParam })).data;
    },
    enabled: !!payload.groupId,
    initialPageParam: 1,
    getNextPageParam,
  });

  const data = query.data?.pages.flatMap((page) => page.items) ?? [];
  const meta = query.data?.pages[0].meta;

  return { data, query, meta };
};
