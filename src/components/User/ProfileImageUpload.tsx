import { MaterialIcons } from "@expo/vector-icons";
import { makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";

import ProfileImageDisplay from "./ProfileImageDisplay";

type IProfileImageUploadProps = {
  onPress: () => void;
  imageUrl?: string;
  editable?: boolean;
  icon?: "file-upload" | "person-outline";
};

const ProfileImageUpload = memo<IProfileImageUploadProps>(
  ({ onPress, imageUrl, editable, icon = "file-upload" }) => {
    const styles = useStyles();
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.profileImageContainer, { marginLeft: 8 }]}
      >
        {imageUrl ? (
          <View>
            <ProfileImageDisplay imageUrl={imageUrl} />
          </View>
        ) : (
          <MaterialIcons name={icon} size={30} color={theme.colors.black} />
        )}
        {editable && (
          <View style={styles.editIcon}>
            <MaterialIcons name="edit" size={15} color={theme.colors.primary} />
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  profileImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: 99,
    padding: 4,
  },
}));

ProfileImageUpload.displayName = "ProfileImageUpload";

export default ProfileImageUpload;
