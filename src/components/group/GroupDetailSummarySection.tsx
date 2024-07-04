import { Entypo } from "@expo/vector-icons";
import { makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import GroupDetailSection from "./GroupDetailSection";

type IGroupDetailSummarySectionProps = object;

const GroupDetailSummarySection = memo<IGroupDetailSummarySectionProps>(() => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();

  console.log("styles", styles);

  return (
    <GroupDetailSection
      title={t("GroupDetailScreen:summary")}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Entypo
          name="chevron-small-right"
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </GroupDetailSection>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

GroupDetailSummarySection.displayName = "GroupDetailSummarySection";

export default GroupDetailSummarySection;
