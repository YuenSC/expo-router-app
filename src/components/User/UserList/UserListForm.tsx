import { MaterialIcons } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareSectionList } from "react-native-keyboard-aware-scroll-view";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import UserDisplay from "./UserDisplay";
import UserListFormFooter from "./UserListFormFooter";
import { useGetGroup } from "../../../api/hooks/group/useGetGroup";
import { useGetMe } from "../../../api/hooks/useGetMe";
import { User } from "../../../api/types/User";
import ImagePickerBottomSheetModal from "../../ImagePickerBottomSheetModal";
import { HStack } from "../../common/Stack";
import UncontrolledTooltip from "../../common/UncontrolledTooltip";

import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import { useBottomSheetModal } from "@/src/hooks/useBottomSheetModal";

type IUserListFormProps = {
  groupId?: string;
  onSubmit?: () => void;
  buttonText?: string;
  selectableUsers?: User[];
};

const UserListForm = memo<IUserListFormProps>(
  ({ groupId, onSubmit, buttonText, selectableUsers = [] }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const styles = useStyles(insets);
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const {
      open,
      ref: bottomSheetModalRef,
      value: targetUserId,
    } = useBottomSheetModal("");

    const { data: profile } = useGetMe();
    const { data: group } = useGetGroup({ id: groupId || "" });
    const { mutate: patchUserUpdate } = usePatchUserUpdate({
      onSuccess: async ({ data: { id } }) => {
        await queryClient.invalidateQueries({
          queryKey: ["user", id],
        });
      },
    });

    const sections = useMemo(() => {
      const { realUsers, virtualUsers } = (group?.users ?? []).reduce(
        (acc, curr) => {
          if (curr.user.email) {
            acc.realUsers.push(curr);
          } else {
            acc.virtualUsers.push(curr);
          }
          return acc;
        },
        {
          realUsers: [] as { user: User; isAdmin: boolean }[],
          virtualUsers: [] as { user: User; isAdmin: boolean }[],
        },
      );

      return [
        { title: t("UserListForm:verified-users"), data: realUsers },
        {
          title: t("UserListForm:virtual-users"),
          data: virtualUsers,
          infoText:
            "Admin User can freely edit virtual users, but not verified users.",
        },
      ];
    }, [group?.users, t]);

    return (
      <View style={styles.container}>
        <KeyboardAwareSectionList
          sections={sections}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.contentContainer}
          renderSectionHeader={({ section: { title, infoText } }) => (
            <HStack
              gap={4}
              style={styles.sectionHeader}
              justifyContent="flex-start"
            >
              <Text style={styles.sectionHeaderTitle}>{title}</Text>
              {infoText && (
                <UncontrolledTooltip
                  popover={<Text>{infoText}</Text>}
                  height={60}
                  width={260}
                >
                  <MaterialIcons
                    name="info-outline"
                    size={24}
                    color={theme.colors.primary}
                  />
                </UncontrolledTooltip>
              )}
            </HStack>
          )}
          renderSectionFooter={() => <View style={styles.sectionFooter} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListFooterComponent={
            <View style={{ marginTop: -16 }}>
              <UserListFormFooter
                groupId={groupId}
                onSubmit={onSubmit}
                selectableUsers={selectableUsers}
                buttonText={buttonText}
                disabledAddUser={group?.users?.length === 5}
              />
            </View>
          }
          renderItem={({ item: { isAdmin, user } }) => {
            const isProfileUser = user.id === profile?.id;
            const isOtherVerifiedUser = Boolean(user.email) && !isProfileUser;

            return (
              <Link href={`user/${user.id}?groupId=${groupId}`} asChild>
                <TouchableOpacity disabled={isOtherVerifiedUser}>
                  <UserDisplay
                    isAdmin={isAdmin}
                    userId={user.id}
                    onPressProfileImage={() => open(user.id)}
                    isProfileImageDisabled={isOtherVerifiedUser}
                    isProfileUser={isProfileUser}
                  />
                </TouchableOpacity>
              </Link>
            );
          }}
        />

        <ImagePickerBottomSheetModal
          onImageUpload={(image) => {
            if (!targetUserId) return;
            patchUserUpdate({ id: targetUserId, profileImage: image });
          }}
          ref={bottomSheetModalRef}
        />
      </View>
    );
  },
);

const useStyles = makeStyles((theme, inset: EdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: Math.max(inset.bottom, 16),
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerContainer: {
    marginBottom: 24,
  },
  userCount: {
    color: theme.colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: 8,
  },
  sectionHeader: {
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.background,
  },
  sectionHeaderTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  sectionFooter: {
    paddingBottom: 16,
  },
}));

UserListForm.displayName = "UserListForm";

export default UserListForm;
