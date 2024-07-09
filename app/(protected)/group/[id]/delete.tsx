import { DrawerActions } from "@react-navigation/native";
import { Button, Text, makeStyles } from "@rneui/themed";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Trans, useTranslation } from "react-i18next";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useDeleteGroup } from "@/src/api/hooks/group/useDeleteGroup";
import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import StyledBottomSheet from "@/src/components/common/StyledBottomSheet";
import StyledBottomSheetView from "@/src/components/common/StyledBottomSheetView";

const GroupDeleteBottomSheet = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  const { id: groupId } = useLocalSearchParams<{ id: string }>();
  const { data: group } = useGetGroup({ id: groupId || "" });
  const { mutate: deleteGroup } = useDeleteGroup({
    onSuccess: () => {
      Toast.show({
        position: "bottom",
        type: "success",
        text1: t("GroupDeleteBottomSheet:group-deleted"),
        text2: t("GroupDeleteBottomSheet:group-deleted-warning"),
      });
      router.back();
      router.navigate("/home");
      navigation.dispatch(DrawerActions.toggleDrawer);
    },
  });

  if (!groupId) return null;

  return (
    <StyledBottomSheet
      onClose={() => router.back()}
      enablePanDownToClose
      enableDynamicSizing
    >
      <StyledBottomSheetView style={styles.content}>
        <Trans
          i18nKey="GroupDeleteBottomSheet:are-you-sure-to-delete-this-group" // optional -> fallbacks to defaults if not provided
          values={{
            groupName: group?.name,
          }}
          components={{
            Highlight: <Text style={styles.titleHighlight} />,
            Text: <Text style={styles.title} />,
          }}
        />

        <Text style={styles.subtitle}>
          {t("GroupDeleteBottomSheet:warning")}
        </Text>

        <Button
          title={t("Common:cancel")}
          color="success"
          onPress={() => router.back()}
        />

        <Button
          title={t("Common:delete")}
          color="error"
          type="clear"
          onPress={() => deleteGroup({ id: groupId })}
        />
      </StyledBottomSheetView>
    </StyledBottomSheet>
  );
};

const useStyles = makeStyles((theme, inset: EdgeInsets) => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.backdrop,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: inset.bottom,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.grey1,
    marginTop: 8,
    marginBottom: 16,
  },
  titleHighlight: {
    color: theme.colors.primary,
  },
}));

export default GroupDeleteBottomSheet;
