import { Text, makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { View } from "react-native";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import FullScreenLoading from "@/src/components/common/FullScreenLoading";
import StyledScrollView from "@/src/components/common/StyledScrollView";
import GroupDetailEmpty from "@/src/components/group/GroupDetailEmpty";
import GroupDetailMemberSection from "@/src/components/group/GroupDetailMemberSection";
import GroupDetailPaymentSection from "@/src/components/group/GroupDetailPaymentSection";
import GroupDetailSummarySection from "@/src/components/group/GroupDetailSummarySection";
import { useAppContext } from "@/src/context/AppContext";

const GroupDetailScreen = () => {
  const styles = useStyles();
  const { currentGroupId } = useAppContext();
  const queryClient = useQueryClient();

  const {
    data: group,
    query: { isLoading },
  } = useGetGroup({ id: currentGroupId || "" });

  const refetch = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["group", currentGroupId],
      }),
      queryClient.invalidateQueries({
        queryKey: ["useGetExpenseUnresolvedAmountPerCurrency"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["useGetExpenseList", { page: 1 }],
      }),
    ]);
  };

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (!group) {
    return <GroupDetailEmpty />;
  }

  return (
    <View style={styles.container}>
      <StyledScrollView
        contentContainerStyle={styles.contentContainer}
        refetch={refetch}
      >
        <View style={styles.sectionPadding}>
          <Text h1>{group.name}</Text>
          {group.description && <Text>{group.description}</Text>}
        </View>

        <GroupDetailSummarySection groupId={group.id} />
        {/* <GroupDetailSummaryCarousel group={currentGroup} /> */}
        <GroupDetailMemberSection group={group} />
        <GroupDetailPaymentSection />
      </StyledScrollView>
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
