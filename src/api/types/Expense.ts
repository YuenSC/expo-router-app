import { ApiResponse } from "./ApiResponse";
import { BaseObject } from "./BaseObject";
import { ApiPaginatedPayload, ApiPaginatedResponse } from "./Pagination";

enum ExpenseTransactionType {
  payer = "payer",
  payee = "payee",
}

export interface Expense extends BaseObject {}

export type PostExpenseCreatePayload = {
  name: string;
  amount: number;
  incurredOn: string;
  createExpenseTransactions: {
    type: ExpenseTransactionType;
    isAutoSplit: boolean;
    amount?: number;
    userId?: string;
  }[];
};
export type PostExpenseCreateResponse = ApiResponse<Expense>;

export interface GetExpensePayload {
  groupId: string;
  id: string;
}
export type GetExpenseResponse = ApiResponse<Expense>;

export interface GetExpenseListPayload extends ApiPaginatedPayload {
  groupId: string;
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
