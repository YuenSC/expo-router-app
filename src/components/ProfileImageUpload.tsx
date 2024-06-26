import { MaterialIcons } from "@expo/vector-icons";
import { makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { TouchableOpacity } from "react-native";

import ProfileImageDisplay from "./ProfileImageDisplay";

type IProfileImageUploadProps = {
  onPress: () => void;
  imageUrl?: string;
  disabled?: boolean;
};

const ProfileImageUpload = memo<IProfileImageUploadProps>(
  ({ onPress, imageUrl, disabled }) => {
    const styles = useStyles();
    const { theme } = useTheme();

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.profileImageContainer, { marginLeft: 8 }]}
      >
        {imageUrl ? (
          <ProfileImageDisplay imageUrl={imageUrl} />
        ) : (
          <MaterialIcons
            name="file-upload"
            size={30}
            color={theme.colors.black}
          />
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
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
}));

ProfileImageUpload.displayName = "ProfileImageUpload";

export default ProfileImageUpload;
