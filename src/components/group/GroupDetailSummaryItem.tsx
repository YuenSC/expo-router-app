import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";

import PaymentRelationshipDisplay from "./PaymentRelationshipDisplay";
import { HStack, VStack } from "../common/Stack";

import { PaymentRelationship } from "@/src/api/types/Expense";
import { CurrencyCode } from "@/src/constants/Currency";

type IGroupDetailSummaryItemProps = {
  currencyCode: CurrencyCode;
  paymentRelationship: PaymentRelationship[];
  itemWidth: number;
  onSummaryItemPress: (paymentRelationship: PaymentRelationship) => void;
};

const GroupDetailSummaryItem = memo<IGroupDetailSummaryItemProps>(
  ({ currencyCode, paymentRelationship, itemWidth, onSummaryItemPress }) => {
    const styles = useStyles(itemWidth);

    return (
      <View style={styles.scrollViewItem}>
        <VStack
          gap={16}
          alignItems="stretch"
          justifyContent="flex-start"
          style={styles.container}
        >
          <HStack>
            <VStack alignItems="flex-start">
              <Text h4>{currencyCode}</Text>
            </VStack>
          </HStack>

          <VStack alignItems="stretch" gap={8}>
            {paymentRelationship?.map((item) => (
              <TouchableOpacity
                key={currencyCode + item.debtor.id + item.creditor.id}
                onPress={() => onSummaryItemPress(item)}
              >
                <PaymentRelationshipDisplay
                  currencyCode={currencyCode}
                  debtor={item.debtor}
                  creditor={item.creditor}
                  debtAmount={item.debtAmount}
                />
              </TouchableOpacity>
            ))}
          </VStack>
        </VStack>
      </View>
    );
  },
);

const useStyles = makeStyles((theme, itemWidth: number) => ({
  scrollViewItem: {
    width: itemWidth,
  },
  container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  switch: {
    transform: [
      {
        scaleX: 0.8,
      },
      {
        scaleY: 0.8,
      },
    ],
  },
  rounded: {
    borderRadius: 50,
  },
}));

GroupDetailSummaryItem.displayName = "GroupDetailSummaryItem";

export default GroupDetailSummaryItem;
