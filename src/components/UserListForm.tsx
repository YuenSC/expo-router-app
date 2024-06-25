import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Button, Input, Text, makeStyles, useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import ProfileImageUpload from "./ProfileImageUpload";
import { HStack, VStack } from "./Stack";
import { useGetMe } from "../api/hooks/useGetMe";
import { usePostCreateUserInGroup } from "../api/hooks/usePostCreateUserInGroup";
import { Group } from "../api/types/Group";
import { PostUserCreatePayload, User } from "../api/types/User";

type IUserListFormProps = {
  group?: Group;
  onSubmit: (users: PostUserCreatePayload[]) => void;
  buttonText?: string;
  selectableUsers?: User[];
};

const UserListForm = memo<IUserListFormProps>(
  ({ group, onSubmit, buttonText, selectableUsers = [] }) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { data: profile } = useGetMe();
    const queryClient = useQueryClient();

    const [name, setName] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const users = group?.users ?? [];

    const { mutate: postCreateUserInGroup } = usePostCreateUserInGroup({
      onSuccess: () => {
        setName("");
        setIsFocused(false);
        queryClient.invalidateQueries({ queryKey: ["group", group?.id] });
      },
    });

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
      >
        <VStack alignItems="flex-start" style={styles.titleContainer}>
          <Text h1 style={styles.title}>
            {group ? t("UserListForm:members") : t("UserListForm:all-members")}
          </Text>
        </VStack>

        <VStack gap={8}>
          {users?.map((user, index) => {
            const isProfileUser = user.id === profile?.id;
            const isLast = index === users.length - 1;

            return (
              <Fragment key={index}>
                <View style={styles.memberContainer}>
                  <HStack gap={16}>
                    <ProfileImageUpload
                      onPress={() => {}}
                      imageUrl={user.imageUrl}
                    />

                    <HStack gap={2} alignItems="center">
                      <Text style={styles.memberName}>{user.name}</Text>
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
                {!isLast && <View style={styles.divider} />}
              </Fragment>
            );
          })}

          <View>
            {isFocused ? (
              <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
              >
                <Input
                  autoFocus
                  onChangeText={setName}
                  value={name}
                  placeholder={t("UserListForm:type-participant-name")}
                  renderErrorMessage={false}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    paddingHorizontal: 0,
                  }}
                  onEndEditing={() => {
                    if (!group?.id) return;
                    postCreateUserInGroup({ name, groupId: group.id });
                  }}
                />
              </Animated.View>
            ) : (
              <TouchableOpacity
                onPress={() => setIsFocused(true)}
                style={[styles.input]}
              >
                <Entypo name="plus" size={24} color={theme.colors.primary} />
                <Text style={styles.memberName}>
                  {t("UserListForm:add-participant")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </VStack>

        <VStack alignItems="stretch" gap={8} style={styles.buttonContainer}>
          {selectableUsers?.length > 0 && (
            <Button
              title={t("UserListForm:select-existing-user")}
              type="outline"
              onPress={() => {}}
            />
          )}
          <Button
            title={buttonText ?? t("Common:next")}
            onPress={() => onSubmit([])}
          />
        </VStack>
      </ScrollView>
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
  buttonContainer: {
    marginTop: 16,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  memberName: {
    fontSize: 18,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    paddingHorizontal: 8,
  },
  inputContainer: {
    padding: 12,
    paddingHorizontal: 16,
  },
  memberNameOwner: {
    fontStyle: "italic",
    color: theme.colors.primary,
  },
}));

UserListForm.displayName = "UserList";

export default UserListForm;
