import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getExpensePaymentRelationship } from "../../expense";
import {
  GetExpensePaymentRelationshipPayload,
  GetExpensePaymentRelationshipResponse,
} from "../../types/Expense";

export const useGetExpensePaymentRelationship = (
  payload: GetExpensePaymentRelationshipPayload,
  options?: Omit<
    UseQueryOptions<GetExpensePaymentRelationshipResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  const query = useQuery({
    queryKey: ["useGetExpensePaymentRelationship", payload],
    queryFn: () => getExpensePaymentRelationship(payload),
    enabled: !!payload.groupId,
    ...options,
  });

  const data = query.data?.data;
  return { data, query };
};
