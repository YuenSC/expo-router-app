import { makeStyles, Text, useTheme } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import GroupDetailSection from "./GroupDetailSection";
import { HStack } from "../common/Stack";

import { useGetExpenseUnresolvedAmountPerCurrency } from "@/src/api/hooks/expense/useGetExpenseUnresolvedAmountPerCurrency";
import { CurrencyCode } from "@/src/constants/Currency";
import { formatAmount } from "@/src/utils/payments";

type IGroupDetailMyBalanceSectionProps = { groupId: string };

const GroupDetailMyBalanceSection = memo<IGroupDetailMyBalanceSectionProps>(
  ({ groupId }) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { data } = useGetExpenseUnresolvedAmountPerCurrency({ groupId });
    const hasUnresolvedAmount =
      data &&
      Object.entries(data).some(([, totalNetAmount]) => totalNetAmount !== 0);

    if (!hasUnresolvedAmount) return null;

    return (
      <GroupDetailSection
        title={t("GroupDetailScreen:my-balance")}
        // titleRight={
        //   <TouchableOpacity>
        //     <Entypo
        //       name="chevron-small-right"
        //       size={24}
        //       color={theme.colors.primary}
        //     />
        //   </TouchableOpacity>
        // }
        style={styles.container}
      >
        {hasUnresolvedAmount && (
          <HStack gap={6} justifyContent="flex-start" flexWrap="wrap">
            {Object.entries(data).map(([currencyCode, totalNetAmount]) => {
              if (totalNetAmount === 0) return null;

              const amount = formatAmount(
                totalNetAmount,
                currencyCode as CurrencyCode,
                { currencySymbol: "code" },
              );
              const sign = Math.sign(totalNetAmount);

              return (
                <TouchableOpacity
                  key={currencyCode}
                  style={styles.amountButton}
                  // onPress={() =>
                  //   navigation.navigate("GroupSummary", {
                  //     groupId: currentGroup.id,
                  //   })
                  // }
                >
                  <HStack gap={4}>
                    <Text
                      key={currencyCode}
                      style={[
                        styles.amountText,
                        sign > 0 && { color: theme.colors.success },
                        sign < 0 && { color: theme.colors.error },
                      ]}
                    >
                      {amount}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </HStack>
        )}
      </GroupDetailSection>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: { gap: 6 },
  amountButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    width: "auto",
    flexGrow: 0,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
}));

GroupDetailMyBalanceSection.displayName = "GroupDetailMyBalanceSection";

export default GroupDetailMyBalanceSection;
