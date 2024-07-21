import { Text, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { View } from "react-native";

import FullWidthArrow from "./FullWidthArrow";
import ProfileImageDisplay from "../User/ProfileImageDisplay";
import { HStack, VStack } from "../common/Stack";

import { User } from "@/src/api/types/User";
import { CurrencyCode } from "@/src/constants/Currency";
import { formatAmount, roundAmountToDecimal } from "@/src/utils/payments";

type IPaymentRelationshipDisplayProps = {
  debtor: User;
  creditor: User;
  debtAmount: number;
  currencyCode: CurrencyCode;
};

const PaymentRelationshipDisplay = memo<IPaymentRelationshipDisplayProps>(
  ({ debtor, creditor, debtAmount, currencyCode }) => {
    const styles = useStyles();

    return (
      <HStack>
        <VStack gap={2}>
          <ProfileImageDisplay imageUrl={debtor.imageUrl} />
          <Text>{debtor.name}</Text>
        </VStack>
        <View style={styles.container}>
          <FullWidthArrow />
          <VStack>
            <Text>
              {formatAmount(
                roundAmountToDecimal(debtAmount),
                currencyCode as CurrencyCode,
              )}
            </Text>
          </VStack>
        </View>
        <VStack gap={2}>
          <ProfileImageDisplay imageUrl={creditor.imageUrl} />
          <Text>{creditor.name}</Text>
        </VStack>
      </HStack>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    margin: 12,
  },
}));

PaymentRelationshipDisplay.displayName = "PaymentRelationshipDisplay";

export default PaymentRelationshipDisplay;
