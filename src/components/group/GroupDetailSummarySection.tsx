import { Text, makeStyles } from "@rneui/themed";
import { useRouter } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { View, useWindowDimensions } from "react-native";

import GroupDetailSection from "./GroupDetailSection";
import GroupDetailSummaryItem from "./GroupDetailSummaryItem";
import StyledScrollView from "../common/StyledScrollView";

import { useGetExpensePaymentRelationship } from "@/src/api/hooks/expense/useGetExpensePaymentRelationship";
import { PaymentRelationship } from "@/src/api/types/Expense";
import { Group } from "@/src/api/types/Group";
import { CurrencyCode } from "@/src/constants/Currency";

type IGroupDetailSummarySectionProps = {
  group: Group;
};

const GroupDetailSummarySection = memo<IGroupDetailSummarySectionProps>(
  ({ group }) => {
    const styles = useStyles();
    const windowDimensions = useWindowDimensions();
    const { t } = useTranslation();
    const router = useRouter();

    const {
      data: paymentRelationshipByCurrency = {} as Record<
        CurrencyCode,
        PaymentRelationship[]
      >,
    } = useGetExpensePaymentRelationship({ groupId: group.id });

    const isSingleCurrency =
      Object.keys(paymentRelationshipByCurrency).length === 1;

    const itemWidth = isSingleCurrency
      ? windowDimensions.width - 32
      : windowDimensions.width * 0.8;

    if (Object.keys(paymentRelationshipByCurrency).length === 0) {
      return (
        <View style={styles.container}>
          <Text>
            {t("GroupDetailSummaryCarousel:all-your-expenses-are-balanced")}
          </Text>
        </View>
      );
    }

    return (
      <GroupDetailSection
        title={t("GroupDetailScreen:unresolved-amount")}
        style={styles.container}
        titleContainerStyle={styles.titleContainer}
      >
        {Object.keys(paymentRelationshipByCurrency).length === 0 ? (
          <View style={styles.container}>
            <Text>
              {t("GroupDetailSummaryCarousel:all-your-expenses-are-balanced")}
            </Text>
          </View>
        ) : (
          <StyledScrollView
            horizontal
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={itemWidth + 16}
            decelerationRate="fast"
            scrollEnabled={!isSingleCurrency}
          >
            {Object.entries(paymentRelationshipByCurrency).map(
              ([currencyCode, items]) => (
                <GroupDetailSummaryItem
                  key={currencyCode}
                  onSummaryItemPress={() => {
                    // TODO: Fix this
                    router.back();
                  }}
                  currencyCode={currencyCode as CurrencyCode}
                  itemWidth={itemWidth}
                  paymentRelationship={
                    paymentRelationshipByCurrency[currencyCode as CurrencyCode]
                  }
                />
              ),
            )}
          </StyledScrollView>
        )}
      </GroupDetailSection>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    gap: 4,
    paddingHorizontal: 0,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
}));

GroupDetailSummarySection.displayName = "GroupDetailSummarySection";

export default GroupDetailSummarySection;
