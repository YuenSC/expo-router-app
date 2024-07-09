import { useHeaderHeight } from "@react-navigation/elements";
import { Text, makeStyles } from "@rneui/themed";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import ButtonWithRef from "../common/ButtonWithRef";

type IGroupDetailEmptyProps = object;

const GroupDetailEmpty = memo<IGroupDetailEmptyProps>(() => {
  const styles = useStyles();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.emptyContainer, { paddingBottom: headerHeight }]}>
      <LottieView
        autoPlay
        style={styles.lottie}
        source={require("@/src/assets/lottie/empty.json")}
      />
      <Text style={styles.emptyText}>
        {t("GroupDetailScreen:no-group-warning")}
      </Text>
      <Link href="group/create" asChild>
        <ButtonWithRef title={t("GroupDetailScreen:add-group")} />
      </Link>
    </View>
  );
});

const useStyles = makeStyles((theme) => ({
  emptyContainer: {
    justifyContent: "center",
    padding: 16,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 16,
    fontWeight: "500",
  },
  lottie: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
  },
}));

GroupDetailEmpty.displayName = "GroupDetailEmpty";

export default GroupDetailEmpty;
