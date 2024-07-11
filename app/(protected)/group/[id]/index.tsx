import { makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

import { usePatchGroupUpdate } from "@/src/api/hooks/group/usePatchGroupUpdate";
import StyledScrollView from "@/src/components/common/StyledScrollView";
import GroupForm from "@/src/components/group/GroupForm";

const Page = () => {
  const styles = useStyles();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: groupId } = useLocalSearchParams<{ id: string }>();

  const { mutate: patchGroupUpdate, isPending: isPendingPatchGroupUpdate } =
    usePatchGroupUpdate({
      onSuccess: ({ data: { id } }) => {
        queryClient.invalidateQueries({
          queryKey: ["useGetGroupList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["group", id],
        });
        router.back();
      },
    });

  if (!groupId) return null;

  return (
    <StyledScrollView style={styles.container}>
      <GroupForm
        groupId={groupId}
        onSubmit={(values) => patchGroupUpdate({ ...values, id: groupId })}
        isSubmitting={isPendingPatchGroupUpdate}
      />
    </StyledScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
}));

export default Page;
