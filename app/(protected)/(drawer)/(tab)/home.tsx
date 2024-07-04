import { Text, makeStyles } from "@rneui/themed";
import { ScrollView, View } from "react-native";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import FullScreenLoading from "@/src/components/common/FullScreenLoading";
import GroupDetailEmpty from "@/src/components/group/GroupDetailEmpty";
import GroupDetailMemberSection from "@/src/components/group/GroupDetailMemberSection";
import GroupDetailPaymentSection from "@/src/components/group/GroupDetailPaymentSection";
import GroupDetailSummarySection from "@/src/components/group/GroupDetailSummarySection";
import { useAppContext } from "@/src/context/AppContext";

const GroupDetailScreen = () => {
  const styles = useStyles();
  const { currentGroupId } = useAppContext();
  const {
    data: group,
    query: { isLoading },
  } = useGetGroup({ id: currentGroupId || "" });

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (!group) {
    return <GroupDetailEmpty />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.sectionPadding}>
          <Text h1>{group.name}</Text>
          {group.description && <Text>{group.description}</Text>}
          {/* <HStack gap={6} justifyContent="flex-start" flexWrap="wrap">
            {Object.entries(totalNetAmountByCurrency).map(
              ([currencyCode, totalNetAmount]) => {
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
                    onPress={() =>
                      navigation.navigate("GroupSummary", {
                        groupId: currentGroup.id,
                      })
                    }
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
              },
            )}
          </HStack> */}
        </View>

        <GroupDetailSummarySection />
        {/* <GroupDetailSummaryCarousel group={currentGroup} /> */}
        <GroupDetailMemberSection group={group} />
        <GroupDetailPaymentSection />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 32,
    paddingTop: 16,
  },
  sectionPadding: {
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
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

export default GroupDetailScreen;
