import { Text, makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, TouchableOpacity, View } from "react-native";

import UserListFormFooter from "./UserListFormFooter";
import { useGetGroup } from "../../api/hooks/useGetGroup";
import { useGetMe } from "../../api/hooks/useGetMe";
import { User } from "../../api/types/User";
import ImagePickerBottomSheetModal from "../ImagePickerBottomSheetModal";
import ProfileImageUpload from "../ProfileImageUpload";
import { HStack } from "../Stack";

import { usePatchUserUpdate } from "@/src/api/hooks/usePatchUserUpdate";
import { useBottomSheetModal } from "@/src/hooks/useBottomSheetModal";

type IUserListFormProps = {
  groupId?: string;
  onSubmit: () => void;
  buttonText?: string;
  selectableUsers?: User[];
};

const UserListForm = memo<IUserListFormProps>(
  ({ groupId, onSubmit, buttonText, selectableUsers = [] }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { data: profile } = useGetMe();
    const {
      open,
      ref: bottomSheetModalRef,
      value: targetUserId,
    } = useBottomSheetModal("");
    const queryClient = useQueryClient();

    const { data: group } = useGetGroup({ id: groupId || "" });

    const { mutate: patchUserUpdate } = usePatchUserUpdate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["group", groupId],
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
        { title: t("UserListForm:virtual-users"), data: virtualUsers },
      ];
    }, [group?.users, t]);

    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderSectionFooter={() => <View style={styles.sectionFooter} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text h1 style={styles.headerTitle}>
                {group
                  ? t("UserListForm:members")
                  : t("UserListForm:all-members")}
              </Text>
            </View>
          }
          ListFooterComponent={
            <UserListFormFooter
              groupId={groupId}
              onSubmit={onSubmit}
              selectableUsers={selectableUsers}
              buttonText={buttonText}
            />
          }
          renderItem={({ item: { isAdmin, user } }) => {
            const isProfileUser = user.id === profile?.id;
            const isOtherVerifiedUser = Boolean(user.email) && !isProfileUser;

            return (
              <TouchableOpacity
                disabled={isOtherVerifiedUser}
                onPress={() => {}}
              >
                <HStack alignItems="center" style={styles.memberContainer}>
                  <HStack gap={16}>
                    <ProfileImageUpload
                      icon="person-outline"
                      disabled={isOtherVerifiedUser}
                      onPress={() => open(user.id)}
                      imageUrl={user.imageUrl}
                    />

                    <HStack gap={2} alignItems="center">
                      <Text style={styles.memberName}>{user.name}</Text>

                      {isProfileUser && (
                        <Text style={styles.profileLabel}>
                          {t("Common:profileUserLabel")}
                        </Text>
                      )}
                    </HStack>
                  </HStack>

                  {isAdmin && (
                    <View style={styles.adminLabelContainer}>
                      <Text style={styles.adminLabel}>
                        {t("Common:adminLabel")}
                      </Text>
                    </View>
                  )}
                </HStack>
              </TouchableOpacity>
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

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    fontWeight: "bold",
  },
  headerContainer: {
    marginBottom: 24,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#D6D6D6",
    marginVertical: 8,
  },
  memberName: {
    fontSize: 18,
  },
  profileLabel: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
  adminLabelContainer: {
    marginLeft: "auto",
  },
  adminLabel: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  sectionFooter: {
    marginVertical: 8,
  },
}));

UserListForm.displayName = "UserListForm";

export default UserListForm;
