import { Entypo } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import GroupDetailSection from "./GroupDetailSection";
import { HStack } from "../common/Stack";

type IGroupDetailPaymentSectionProps = object;

const GroupDetailPaymentSection = memo<IGroupDetailPaymentSectionProps>(() => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();

  console.log("styles", styles);

  return (
    <GroupDetailSection title={t("GroupDetailScreen:payment")}>
      <HStack>
        <Text>
          {t("GroupDetailScreen:payment-count", {
            count: 0,
          })}
        </Text>

        <TouchableOpacity>
          <Entypo
            name="chevron-small-right"
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </HStack>
    </GroupDetailSection>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

GroupDetailPaymentSection.displayName = "GroupDetailPaymentSection";

export default GroupDetailPaymentSection;
