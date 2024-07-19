import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getExpenseUnresolvedAmountPerCurrency } from "../../expense";
import {
  GetExpenseUnresolvedAmountPerCurrencyPayload,
  GetExpenseUnresolvedAmountPerCurrencyResponse,
} from "../../types/Expense";

export const useGetExpenseUnresolvedAmountPerCurrency = (
  payload: GetExpenseUnresolvedAmountPerCurrencyPayload,
  options?: Omit<
    UseQueryOptions<GetExpenseUnresolvedAmountPerCurrencyResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  const query = useQuery({
    queryKey: ["useGetExpenseUnresolvedAmountPerCurrency", payload],
    queryFn: () => getExpenseUnresolvedAmountPerCurrency(payload),
    enabled: !!payload.groupId,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
