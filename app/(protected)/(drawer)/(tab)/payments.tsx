import { makeStyles, Text } from "@rneui/themed";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

import { useGetExpenseList } from "@/src/api/hooks/expense/useGetExpenseList";
import { Expense } from "@/src/api/types/Expense";
import InfiniteScroll from "@/src/components/common/InfiniteScroll";
import ExpenseListItemDisplay from "@/src/components/expense/ExpenseListItemDisplay";
import { useAppContext } from "@/src/context/AppContext";

const Page = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { currentGroupId } = useAppContext();

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
  });

  return (
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
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={() => (
        <Text h1 style={styles.title}>
          {t("PaymentRecordListScreen:payments")}
        </Text>
      )}
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
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  contentContainer: { paddingBottom: 32 },
  title: { paddingVertical: 16, backgroundColor: theme.colors.background },
  separator: { height: 12 },
}));

export default Page;
