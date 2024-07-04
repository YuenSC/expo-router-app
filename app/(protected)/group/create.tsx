import { makeStyles } from "@rneui/themed";
import { View } from "react-native";

import { usePostGroupCreate } from "@/src/api/hooks/group/usePostGroupCreate";
import GroupForm from "@/src/components/group/GroupForm";
import { useDisclosure } from "@/src/hooks/useDisclosure";

const Page = () => {
  const styles = useStyles();
  const { onOpen } = useDisclosure(true);

  const { mutate: postGroupCreate, isPending: isPendingPostGroupCreate } =
    usePostGroupCreate({
      onSuccess: ({ data: { id } }) => onOpen(),
    });

  return (
    <View style={styles.container}>
      <GroupForm
        onSubmit={postGroupCreate}
        isSubmitting={isPendingPostGroupCreate}
      />
    </View>
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
  dialogTitle: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  overlay: {
    backgroundColor: theme.colors.modal,
  },
}));

export default Page;
