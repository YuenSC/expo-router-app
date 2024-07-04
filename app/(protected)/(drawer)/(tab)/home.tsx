import { AntDesign } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import FullScreenLoading from "@/src/components/common/FullScreenLoading";
import { HStack } from "@/src/components/common/Stack";
import GroupDetailEmpty from "@/src/components/group/GroupDetailEmpty";
import { useAppContext } from "@/src/context/AppContext";

const GroupDetailScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();
  const { currentGroupId } = useAppContext();
  const {
    data: currentGroup,
    query: { isLoading },
  } = useGetGroup({ id: currentGroupId || "" });

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (!currentGroup) {
    return <GroupDetailEmpty />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.sectionPadding}>
          <Text h1>{currentGroup.name}</Text>
          {/* <HStack gap={6} justifyContent="flex-start" flexWrap="wrap">
            {Object.entries(totalNetAmountByCurrency).map(
              ([currencyCode, totalNetAmount]) => {
                if (totalNetAmount === 0) return null;

                const amount = formatAmount(
                  totalNetAmount,
                  currencyCode as CurrencyCode,
                  { currencySymbol: "code" },
                );
                const sign = Math.sign(totalNetAmount);

                return (
                  <TouchableOpacity
                    key={currencyCode}
                    style={styles.amountButton}
                    onPress={() =>
                      navigation.navigate("GroupSummary", {
                        groupId: currentGroup.id,
                      })
                    }
                  >
                    <HStack gap={4}>
                      <Text
                        key={currencyCode}
                        style={[
                          styles.amountText,
                          sign > 0 && { color: theme.colors.success },
                          sign < 0 && { color: theme.colors.error },
                        ]}
                      >
                        {amount}
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                );
              },
            )}
          </HStack> */}
        </View>
        <View>
          <HStack style={[styles.sectionPadding, { marginBottom: 2 }]}>
            <Text style={styles.label}>{t("GroupDetailScreen:summary")}</Text>
            <TouchableOpacity>
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </HStack>
          {/* <GroupDetailSummaryCarousel group={currentGroup} /> */}
        </View>

        <View style={styles.sectionPadding}>
          <Text style={styles.label}>{t("GroupDetailScreen:member")}</Text>
          <Link asChild href="/user/list">
            <TouchableOpacity style={styles.members}>
              {/* <HStack gap={8}>
              <Text>
                {t("GroupDetailScreen:current-username", {
                  name:
                    groupUsers.find((i) => i.id === profile.userId)?.name ??
                    t("GroupDetailScreen:not-in-group"),
                })}
              </Text>
              <Text style={{ flex: 1, textAlign: "right" }} numberOfLines={1}>
                {memberListText}
              </Text>
            </HStack> */}
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.sectionPadding}>
          <Text style={styles.label}>{t("GroupDetailScreen:payment")}</Text>
          <HStack>
            <Text>
              {t("GroupDetailScreen:payment-count", {
                count: 0,
              })}
            </Text>

            <TouchableOpacity>
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </HStack>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 32,
    paddingTop: 16,
  },
  sectionPadding: {
    paddingHorizontal: 16,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    width: "auto",
    flexGrow: 0,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  members: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
}));

export default GroupDetailScreen;
