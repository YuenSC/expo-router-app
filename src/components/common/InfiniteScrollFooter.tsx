import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text, makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";

import EmptyComponent from "./EmptyComponent";
import { HStack, VStack } from "./Stack";

type IInfiniteScrollFooterProps = {
  isFetchNextPageError?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  dataLength: number;
  allItemsFetchedText?: string;
  isLoading?: boolean;
};

const InfiniteScrollFooter = memo<IInfiniteScrollFooterProps>(
  ({
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
    dataLength,
    allItemsFetchedText,
    isLoading,
  }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
      <View style={styles.footer}>
        {!isFetchNextPageError && isFetchingNextPage && (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        )}
        {dataLength > 0 && !hasNextPage && (
          <VStack style={styles.lottie}>
            <EmptyComponent
              emptyText={
                allItemsFetchedText ?? t("InfiniteScroll:all-items-are-fetched")
              }
            />
          </VStack>
        )}
        {isFetchNextPageError && hasNextPage && (
          <VStack style={styles.lottie}>
            <EmptyComponent
              emptyText={t("InfiniteScroll:failed-to-fetch-more-items")}
            />
            <Button
              type="outline"
              size="sm"
              loading={isFetchingNextPage || isLoading}
              onPress={fetchNextPage}
              style={styles.retryButton}
            >
              <HStack gap={4}>
                <MaterialIcons
                  name="refresh"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text>Retry</Text>
              </HStack>
            </Button>
          </VStack>
        )}
      </View>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingVertical: 32,
  },
  retryButton: {
    minWidth: 100,
  },
  lottie: {
    width: "60%",
    marginHorizontal: "auto",
  },
}));

InfiniteScrollFooter.displayName = "InfiniteScrollFooter";

export default InfiniteScrollFooter;
