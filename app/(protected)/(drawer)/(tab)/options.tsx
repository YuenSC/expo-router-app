import { makeStyles, Text } from "@rneui/themed";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import ButtonWithRef from "@/src/components/common/ButtonWithRef";
import { VStack } from "@/src/components/common/Stack";
import StyledScrollView from "@/src/components/common/StyledScrollview";
import OptionSection from "@/src/components/option/OptionSection";
import OptionSectionItem from "@/src/components/option/OptionSectionItem";
import { useAppContext } from "@/src/context/AppContext";
import { useAuth } from "@/src/context/AuthContext";

const Page = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentGroupId } = useAppContext();

  const { data: profileUser } = useGetMe();
  const { data: currentGroup } = useGetGroup({ id: currentGroupId || "" });
  const { onLogout } = useAuth();

  return (
    <StyledScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <VStack alignItems="stretch">
        <Text h1>{t("OptionsScreen:options")}</Text>
        <Text style={styles.sectionLabel}>
          {t("OptionsScreen:greeting", {
            name: profileUser?.name || t("OptionsScreen:unknown-user"),
          })}
        </Text>
      </VStack>

      {profileUser?.id && (
        <OptionSection
          title={t("OptionsScreen:personal")}
          sections={[
            <OptionSectionItem
              title={t("OptionsScreen:profile")}
              onPress={() => router.push(`/user/${profileUser.id}`)}
            />,
          ]}
        />
      )}
      {currentGroup?.id && (
        <OptionSection
          title={t("OptionsScreen:group-related", {
            name: currentGroup.name,
          })}
          sections={[
            <OptionSectionItem
              title={t("OptionsScreen:group-detail")}
              onPress={() => router.push(`/group/${currentGroupId}`)}
            />,
            <OptionSectionItem
              title={t("OptionsScreen:group-members")}
              onPress={() => router.push(`/group/${currentGroupId}/user-list`)}
            />,
            <OptionSectionItem
              title={t("OptionsScreen:category")}
              onPress={() => {}}
              disabled
              itemRight={
                <Text style={styles.sectionLabel}>
                  {t("Common:coming-soon")}
                </Text>
              }
            />,
          ]}
        />
      )}

      <OptionSection
        title={t("OptionsScreen:app-related")}
        sections={[
          <OptionSectionItem
            title={t("OptionsScreen:language")}
            onPress={() => router.push("/language")}
          />,
          <OptionSectionItem
            title={t("OptionsScreen:contact-us")}
            onPress={() =>
              Linking.openURL("mailto:groupexpense.calvin@gmail.com")
            }
          />,
          <OptionSectionItem
            title={t("OptionsScreen:online-mode")}
            onPress={() => {}}
            disabled
            itemRight={
              <Text style={styles.sectionLabel}>{t("Common:coming-soon")}</Text>
            }
          />,
          <OptionSectionItem
            title={t("OptionsScreen:Upgrade")}
            onPress={() => {}}
            itemRight={
              <Text style={styles.sectionLabel}>{t("Common:coming-soon")}</Text>
            }
          />,
        ]}
      />

      <VStack alignItems="stretch" gap={8}>
        {currentGroup && (
          <Link asChild href={`group/${currentGroupId}/delete`}>
            <ButtonWithRef
              title={t("OptionsScreen:delete-group")}
              type="outline"
              color="error"
            />
          </Link>
        )}
        <ButtonWithRef
          title={t("options:logout")}
          type="outline"
          onPress={onLogout}
        />
      </VStack>
    </StyledScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  sectionLabel: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
}));

export default Page;
