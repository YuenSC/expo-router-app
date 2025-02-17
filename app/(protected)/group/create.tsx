import { makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { usePostGroupCreate } from "@/src/api/hooks/group/usePostGroupCreate";
import StyledScrollView from "@/src/components/common/StyledScrollView";
import GroupCreatedDialog from "@/src/components/group/GroupCreatedDialog";
import GroupForm from "@/src/components/group/GroupForm";
import { useAppContext } from "@/src/context/AppContext";
import { useDisclosure } from "@/src/hooks/useDisclosure";

const Page = () => {
  const styles = useStyles();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isVisible, onClose, onOpen } = useDisclosure(false);
  const { currentGroupId, setCurrentGroupId } = useAppContext();

  const { mutate: postGroupCreate, isPending: isPendingPostGroupCreate } =
    usePostGroupCreate({
      onSuccess: async ({ data: { id } }) => {
        await queryClient.invalidateQueries({ queryKey: ["useGetGroupList"] });
        setCurrentGroupId(id);
        onOpen();
      },
    });

  return (
    <StyledScrollView style={styles.container}>
      <GroupForm
        onSubmit={postGroupCreate}
        isSubmitting={isPendingPostGroupCreate}
      />

      <GroupCreatedDialog
        isVisible={isVisible}
        onClose={() => {
          onClose();
          router.back();
        }}
        onSubmit={() => {
          onClose();
          setTimeout(() => {
            router.replace(`/group/${currentGroupId}/user-list`);
          }, 0);
        }}
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
