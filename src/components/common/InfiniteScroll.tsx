import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  RefreshControl,
} from "react-native";

import EmptyComponent from "./EmptyComponent";
import InfiniteScrollFooter from "./InfiniteScrollFooter";

// Step 1: Define Generic Type for Component
type IInfiniteScrollProps<T> = FlatListProps<T> & {
  infiniteScrollProps: {
    isLoading?: boolean;
    refetch?: () => void;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    isFetchNextPageError?: boolean;
    allItemsFetchedText?: string;
    emptyText?: string;
  };
  data: T[]; // Step 3: Use Generic Type for Data Prop
  renderItem: ListRenderItem<T>;
};

// Step 1: Modify InfiniteScroll to accept a generic type T
const InfiniteScroll = <T,>({
  infiniteScrollProps: {
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    allItemsFetchedText,
    emptyText,
  },
  data,
  ...props
}: IInfiniteScrollProps<T>) => {
  const { t } = useTranslation();

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={!!isLoading} onRefresh={refetch} />
      }
      onEndReached={() => {
        if (!hasNextPage) return;
        if (isFetchNextPageError) return;
        fetchNextPage?.();
      }}
      ListEmptyComponent={() => (
        <EmptyComponent
          emptyText={emptyText ?? t("InfiniteScroll:no-items-found")}
        />
      )}
      ListFooterComponent={() => (
        <InfiniteScrollFooter
          dataLength={data.length}
          allItemsFetchedText={allItemsFetchedText}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      )}
      {...props}
    />
  );
};

InfiniteScroll.displayName = "InfiniteScroll";

export default InfiniteScroll;
