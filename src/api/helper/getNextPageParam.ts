import { ApiPaginatedResponse } from "../types/Pagination";

export const getNextPageParam = (
  lastPage: ApiPaginatedResponse<any>["data"],
) => {
  // Check if there is a next page available
  if (lastPage.meta.hasNextPage) {
    // Return the next page number
    return lastPage.meta.page + 1;
  }
  // If there is no next page, return undefined
  return undefined;
};
