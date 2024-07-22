import { Text, makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import FullScreenLoading from "@/src/components/common/FullScreenLoading";
import StyledScrollView from "@/src/components/common/StyledScrollView";
import GroupDetailEmpty from "@/src/components/group/GroupDetailEmpty";
import GroupDetailMemberSection from "@/src/components/group/GroupDetailMemberSection";
import GroupDetailMyBalanceSection from "@/src/components/group/GroupDetailMyBalanceSection";
import GroupDetailSummarySection from "@/src/components/group/GroupDetailSummarySection";
import { useAppContext } from "@/src/context/AppContext";

const GroupDetailScreen = () => {
  const styles = useStyles();
  const { currentGroupId } = useAppContext();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const { data: group } = useGetGroup({ id: currentGroupId || "" });

  const refetch = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["group", currentGroupId],
      }),
      queryClient.invalidateQueries({
        queryKey: ["useGetExpenseUnresolvedAmountPerCurrency"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["useGetExpensePaymentRelationship"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["useGetExpenseList", { page: 1 }],
      }),
    ]);
  };

  useEffect(() => {
    refetch().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onScroll={(event) => {
          const scrollPositionY = event.nativeEvent.contentOffset.y;
          navigation.setOptions({
            headerTitle: scrollPositionY > 50 ? group.name : "",
          });
        }}
      >
        <View style={styles.sectionPadding}>
          <Text h1>{group.name}</Text>
          {group.description && <Text>{group.description}</Text>}
        </View>

        <GroupDetailMyBalanceSection groupId={group.id} />
        <GroupDetailMemberSection group={group} />
        <GroupDetailSummarySection group={group} />
      </StyledScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  sectionPadding: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 100,
  },
}));

export default GroupDetailScreen;
