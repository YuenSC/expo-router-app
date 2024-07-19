import { Entypo } from "@expo/vector-icons";
import { Text, useTheme } from "@rneui/themed";
import { Link } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import GroupDetailSection from "./GroupDetailSection";
import { HStack } from "../common/Stack";

import { useGetExpenseList } from "@/src/api/hooks/expense/useGetExpenseList";
import { useAppContext } from "@/src/context/AppContext";

type IGroupDetailPaymentSectionProps = object;

const GroupDetailPaymentSection = memo<IGroupDetailPaymentSectionProps>(() => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { currentGroupId } = useAppContext();

  const { meta } = useGetExpenseList({
    groupId: currentGroupId || "",
    page: 1,
    pageSize: 10,
  });

  return (
    <GroupDetailSection title={t("GroupDetailScreen:payment")}>
      <HStack>
        <Text>
          {t("GroupDetailScreen:payment-count", {
            count: meta?.totalItemCount || 0,
          })}
        </Text>

        <Link asChild href="/payments">
          <TouchableOpacity hitSlop={20}>
            <Entypo
              name="chevron-small-right"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </Link>
      </HStack>
    </GroupDetailSection>
  );
});

GroupDetailPaymentSection.displayName = "GroupDetailPaymentSection";

export default GroupDetailPaymentSection;
