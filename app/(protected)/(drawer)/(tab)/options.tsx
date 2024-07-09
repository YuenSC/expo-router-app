import { makeStyles, Text } from "@rneui/themed";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView } from "react-native";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import ButtonWithRef from "@/src/components/common/ButtonWithRef";
import { VStack } from "@/src/components/common/Stack";
import OptionSection from "@/src/components/option/OptionSection";
import OptionSectionItem from "@/src/components/option/OptionSectionItem";
import { useAppContext } from "@/src/context/AppContext";

const Page = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { currentGroupId } = useAppContext();

  const { data: profileUser } = useGetMe();
  const { data: currentGroup } = useGetGroup({ id: currentGroupId || "" });

  return (
    <ScrollView
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
          sections={[<OptionSectionItem title={t("OptionsScreen:profile")} />]}
        />
      )}
      {currentGroup?.id && (
        <OptionSection
          title={t("OptionsScreen:group-related", {
            name: currentGroup.name,
          })}
          sections={[
            <OptionSectionItem title={t("OptionsScreen:group-detail")} />,
            <OptionSectionItem title={t("OptionsScreen:group-members")} />,
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
          <OptionSectionItem title={t("OptionsScreen:all-members")} />,
          <OptionSectionItem title={t("OptionsScreen:language")} />,
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

      {currentGroup && (
        <Link asChild href={`group/${currentGroupId}/delete`}>
          <ButtonWithRef
            title={t("OptionsScreen:delete-group")}
            type="outline"
            color="error"
          />
        </Link>
      )}
    </ScrollView>
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
