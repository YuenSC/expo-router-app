import { Entypo } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { HStack } from "../../common/Stack";
import ProfileImageUpload from "../ProfileImageUpload";

import { useGetUser } from "@/src/api/hooks/user/useGetUser";

type IUserDisplayProps = {
  userId: string;
  isAdmin?: boolean;
  isProfileUser?: boolean;
  isProfileImageDisabled?: boolean;
  onPressProfileImage: () => void;
};

const UserDisplay = memo<IUserDisplayProps>(
  ({
    userId,
    isAdmin,
    isProfileUser,
    onPressProfileImage,
    isProfileImageDisabled,
  }) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { data: user } = useGetUser({ id: userId });

    return (
      <HStack alignItems="center" style={styles.memberContainer}>
        <HStack gap={16}>
          <ProfileImageUpload
            icon="person-outline"
            editable={!isProfileImageDisabled}
            onPress={onPressProfileImage}
            imageUrl={user?.imageUrl}
          />

          <HStack gap={2} alignItems="center">
            <Text style={styles.memberName}>
              {user?.name || "Unknown User"}
            </Text>

            {isProfileUser && (
              <Text style={styles.profileLabel}>
                {t("Common:profileUserLabel")}
              </Text>
            )}
          </HStack>
        </HStack>

        {isAdmin ? (
          <View style={styles.adminLabelContainer}>
            <Text style={styles.adminLabel}>{t("Common:adminLabel")}</Text>
          </View>
        ) : (
          // arrow icon
          <Entypo
            name="chevron-small-right"
            size={24}
            color={theme.colors.primary}
          />
        )}
      </HStack>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  memberName: {
    fontSize: 18,
  },
  adminLabelContainer: {
    marginLeft: "auto",
  },
  adminLabel: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
  profileLabel: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
}));

UserDisplay.displayName = "UserDisplay";

export default UserDisplay;
