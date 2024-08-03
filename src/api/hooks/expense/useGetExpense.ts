import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getExpense } from "../../expense";
import { GetExpensePayload, GetExpenseResponse } from "../../types/Expense";

export const useGetExpense = (
  payload: GetExpensePayload,
  options?: Omit<UseQueryOptions<GetExpenseResponse>, "queryKey" | "queryFn">,
) => {
  const query = useQuery({
    queryKey: ["useGetExpense", payload],
    queryFn: () => getExpense(payload),
    enabled: !!payload.id,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
