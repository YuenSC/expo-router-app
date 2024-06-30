import { Entypo } from "@expo/vector-icons";
import { Button, Input, Text, useTheme, makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { usePostCreateUserInGroup } from "../../../api/hooks/group/usePostCreateUserInGroup";
import { User } from "../../../api/types/User";
import { VStack } from "../../Stack";

type IUserListFormFooterProps = {
  groupId?: string;
  selectableUsers: User[];
  buttonText?: string;
  onSubmit: () => void;
  disabledAddUser?: boolean;
};

const UserListFormFooter = ({
  groupId,
  selectableUsers,
  buttonText,
  onSubmit,
  disabledAddUser,
}: IUserListFormFooterProps) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const { mutate: postCreateUserInGroup } = usePostCreateUserInGroup({
    onSuccess: () => {
      setName("");
      setIsFocused(false);
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });

  return (
    <View>
      {!disabledAddUser && (
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
                onBlur={() => setIsFocused(false)}
                onSubmitEditing={() => {
                  if (!groupId || !name) return;
                  postCreateUserInGroup({ name, groupId });
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
      )}
      <VStack alignItems="stretch" gap={8} style={styles.buttonContainer}>
        {selectableUsers?.length > 0 && (
          <Button
            title={t("UserListForm:select-existing-user")}
            type="outline"
            onPress={() => {}}
          />
        )}
        <Button title={buttonText ?? t("Common:next")} onPress={onSubmit} />
      </VStack>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginTop: 16,
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
}));

UserListFormFooter.displayName = "UserListFormFooter";

export default UserListFormFooter;
