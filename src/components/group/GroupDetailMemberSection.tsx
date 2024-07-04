import { Text, makeStyles } from "@rneui/themed";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import GroupDetailSection from "./GroupDetailSection";
import { HStack } from "../common/Stack";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { Group } from "@/src/api/types/Group";

type IGroupDetailMemberSectionProps = {
  group: Group;
};

const GroupDetailMemberSection = memo<IGroupDetailMemberSectionProps>(
  ({ group }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { data: profile } = useGetMe();

    const memberListText = useMemo(() => {
      const names =
        group.users
          ?.filter(({ user }) => user.id !== profile?.id)
          .map((item) => item.user.name) ?? [];

      return names.length > 2
        ? `${names.slice(0, 2).join(", ")} ${t("GroupDetailScreen:and-more")}`
        : names.join(` ${t("GroupDetailScreen:and")} `);
    }, [group.users, profile?.id, t]);

    return (
      <GroupDetailSection
        style={styles.container}
        title={t("GroupDetailScreen:member")}
      >
        <TouchableOpacity style={styles.members}>
          <HStack gap={8}>
            <Text>
              {t("GroupDetailScreen:current-username", {
                name:
                  group?.users?.find(({ user }) => user.id === profile?.id)
                    ?.user.name ?? t("GroupDetailScreen:not-in-group"),
              })}
            </Text>
            <Text style={{ flex: 1, textAlign: "right" }} numberOfLines={1}>
              {memberListText}
            </Text>
          </HStack>
        </TouchableOpacity>
      </GroupDetailSection>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  members: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
}));

GroupDetailMemberSection.displayName = "GroupDetailMemberSection";

export default GroupDetailMemberSection;
