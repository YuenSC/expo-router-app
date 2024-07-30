import { ApiResponse } from "./ApiResponse";
import { BillCategoryEnum } from "./BillCategories";

import { CurrencyCode } from "@/src/constants/Currency";

export interface GetGroupStatisticsPayload {
  groupId: string;
}

export type GetGroupStatisticsResponse = ApiResponse<{
  categoryExpenseByCurrency: Record<
    CurrencyCode,
    Record<BillCategoryEnum, number>
  >;
  userCategoryExpenseByCurrency: Record<
    CurrencyCode,
    Record<BillCategoryEnum, number>
  >;
}>;
