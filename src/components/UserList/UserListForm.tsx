import { AntDesign, Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, TouchableOpacity, View } from "react-native";

import UserListFormFooter from "./UserListFormFooter";
import { useGetGroup } from "../../api/hooks/useGetGroup";
import { useGetMe } from "../../api/hooks/useGetMe";
import { User } from "../../api/types/User";
import ImagePickerBottomSheetModal from "../ImagePickerBottomSheetModal";
import ProfileImageUpload from "../ProfileImageUpload";
import { HStack } from "../Stack";

type IUserListFormProps = {
  groupId?: string;
  onSubmit: () => void;
  buttonText?: string;
  selectableUsers?: User[];
};

const UserListForm = memo<IUserListFormProps>(
  ({ groupId, onSubmit, buttonText, selectableUsers = [] }) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { data: profile } = useGetMe();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const { data: group } = useGetGroup(
      { id: groupId || "" },
      { enabled: !!groupId },
    );

    const { realUsers, virtualUsers } = (group?.users ?? []).reduce(
      (acc, user) => {
        if (user.email) {
          acc.realUsers.push(user);
        } else {
          acc.virtualUsers.push(user);
        }
        return acc;
      },
      { realUsers: [] as User[], virtualUsers: [] as User[] },
    );

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            { title: t("UserListForm:verified-users"), data: realUsers },
            { title: t("UserListForm:virtual-users"), data: virtualUsers },
          ]}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderSectionFooter={() => <View style={{ marginVertical: 8 }} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <Text h1 style={styles.title}>
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
          renderItem={({ item }) => {
            const isProfileUser = item.id === profile?.id;

            return (
              <View style={styles.memberContainer}>
                <HStack gap={16}>
                  <ProfileImageUpload
                    onPress={() => {
                      bottomSheetModalRef.current?.present();
                    }}
                    imageUrl={item.imageUrl}
                  />

                  <HStack gap={2} alignItems="center">
                    <Text style={styles.memberName}>{item.name}</Text>
                    {isProfileUser && (
                      <Text style={styles.memberNameOwner}>
                        {t("Common:profileUserLabel")}
                      </Text>
                    )}
                  </HStack>
                </HStack>

                <HStack gap={8}>
                  <TouchableOpacity onPress={() => {}}>
                    <Feather
                      name="edit"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <AntDesign
                      name="delete"
                      size={24}
                      color={theme.colors.error}
                    />
                  </TouchableOpacity>
                </HStack>
              </View>
            );
          }}
        />

        <ImagePickerBottomSheetModal
          onImageUpload={(image) => console.log("image", image)}
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
  title: {
    fontWeight: "bold",
  },
  titleContainer: {
    marginBottom: 24,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: 8,
  },
  memberName: {
    fontSize: 18,
  },
  memberNameOwner: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
}));

UserListForm.displayName = "UserListForm";

export default UserListForm;
