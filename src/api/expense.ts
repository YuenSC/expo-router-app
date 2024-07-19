import axios from "axios";
import queryString from "query-string";

import {
  DeleteExpensePayload,
  DeleteExpenseResponse,
  GetExpenseListPayload,
  GetExpenseListResponse,
  GetExpensePayload,
  GetExpenseResponse,
  GetExpenseUnresolvedAmountPerCurrencyPayload,
  GetExpenseUnresolvedAmountPerCurrencyResponse,
  PatchExpenseUpdatePayload,
  PatchExpenseUpdateResponse,
  PostExpenseCreatePayload,
  PostExpenseCreateResponse,
} from "./types/Expense";

export const postExpenseCreate = async ({
  groupId,
  ...payload
}: PostExpenseCreatePayload): Promise<PostExpenseCreateResponse> => {
  return (await axios.post(`/api/groups/${groupId}/expenses`, payload)).data;
};

export const getExpense = async ({
  id,
  groupId,
}: GetExpensePayload): Promise<GetExpenseResponse> => {
  return (await axios.get(`/api/groups/${groupId}/expenses/${id}`)).data;
};

export const getExpenseUnresolvedAmountPerCurrency = async ({
  groupId,
}: GetExpenseUnresolvedAmountPerCurrencyPayload): Promise<GetExpenseUnresolvedAmountPerCurrencyResponse> => {
  return (
    await axios.get(
      `/api/groups/${groupId}/expenses/unresolved-amount-per-currency`,
    )
  ).data;
};

export const getExpenseList = async ({
  groupId,
  ...payload
}: GetExpenseListPayload): Promise<GetExpenseListResponse> => {
  return (
    await axios.get(
      `/api/groups/${groupId}/expenses?${queryString.stringify(payload)}`,
    )
  ).data;
};

export const patchExpenseUpdate = async ({
  id,
  groupId,
  ...payload
}: PatchExpenseUpdatePayload): Promise<PatchExpenseUpdateResponse> => {
  return (await axios.patch(`/api/groups/${groupId}/expenses/${id}`, payload))
    .data;
};

export const deleteExpense = async ({
  id,
  groupId,
}: DeleteExpensePayload): Promise<DeleteExpenseResponse> => {
  return (await axios.delete(`/api/groups/${groupId}/expenses/${id}`)).data;
};
