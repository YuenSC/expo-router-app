import { makeStyles, Text } from "@rneui/themed";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { useDebounce } from "use-debounce";

import { useGetExpenseList } from "@/src/api/hooks/expense/useGetExpenseList";
import { Expense } from "@/src/api/types/Expense";
import InfiniteScroll from "@/src/components/common/InfiniteScroll";
import { VStack } from "@/src/components/common/Stack";
import StyledSearchBar from "@/src/components/common/StyledSearchBar";
import ExpenseListItemDisplay from "@/src/components/expense/ExpenseListItemDisplay";
import { useAppContext } from "@/src/context/AppContext";

const Page = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { currentGroupId } = useAppContext();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const {
    data: expenses,
    query: {
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isFetchNextPageError,
      isLoading,
      refetch,
    },
  } = useGetExpenseList({
    groupId: currentGroupId || "",
    page: 1,
    pageSize: 10,
    orderBy: "incurredOn",
    sortOrder: "DESC",
    searchText: debouncedSearchText,
  });

  return (
    <View style={styles.container}>
      <VStack alignItems="flex-start" style={styles.header}>
        <Text h1 style={styles.title}>
          {t("PaymentRecordListScreen:payments")}
        </Text>
        <StyledSearchBar
          onChangeText={setSearchText}
          value={searchText}
          placeholder={t("PaymentRecordListScreen:search")}
          containerStyle={styles.searchBarContainer}
        />
      </VStack>

      <InfiniteScroll<Expense>
        infiniteScrollProps={{
          isLoading,
          refetch,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
          isFetchNextPageError,
        }}
        data={expenses}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          return (
            <Link asChild href={`/expense/${item.id}`}>
              <TouchableOpacity>
                <ExpenseListItemDisplay expense={item} />
              </TouchableOpacity>
            </Link>
          );
        }}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 140,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  title: { backgroundColor: theme.colors.background },
  separator: { height: 12 },
  searchBarContainer: {
    backgroundColor: theme.colors.background,
    marginHorizontal: -8,
  },
}));

export default Page;
