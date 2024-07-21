import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";
import { ApiPaginatedPayload, ApiPaginatedResponse } from "./Pagination";

import { CurrencyCode } from "@/src/constants/Currency";

export enum ExpenseTransactionType {
  payer = "payer",
  payee = "payee",
}

export type CreateExpenseTransaction = {
  type: ExpenseTransactionType;
  isAutoSplit: boolean;
  amount?: number;
  userId: string;
};

export type ExpenseTransaction = BaseObject & CreateExpenseTransaction;

export interface Expense extends BaseObject {
  amount: number;
  incurredOn: string;
  transactions: ExpenseTransaction[];
  description: string;
  currencyCode: string;
}

export type PostExpenseCreatePayload = {
  groupId: string;
  amount: number;
  incurredOn: string;
  description?: string;
  currencyCode: string;
  createExpenseTransactions: CreateExpenseTransaction[];
};
export type PostExpenseCreateResponse = ApiResponse<Expense>;

export interface GetExpensePayload {
  groupId: string;
  id: string;
}
export type GetExpenseResponse = ApiResponse<Expense>;

export interface GetExpenseUnresolvedAmountPerCurrencyPayload {
  groupId: string;
}
export type GetExpenseUnresolvedAmountPerCurrencyResponse = ApiResponse<
  Record<CurrencyCode, number>
>;

export interface GetExpenseListPayload extends ApiPaginatedPayload {
  groupId: string;
  searchText?: string;
}
export type GetExpenseListResponse = ApiPaginatedResponse<Expense>;

export interface DeleteExpensePayload {
  groupId: string;
  id: string;
}
export type DeleteExpenseResponse = ApiResponse<unknown>;

export interface PatchExpenseUpdatePayload {
  groupId: string;
  id: string;
  name?: string;
  description?: string;
}
export type PatchExpenseUpdateResponse = ApiResponse<Expense>;
