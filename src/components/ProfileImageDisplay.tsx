import { Image, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { ActivityIndicator } from "react-native";

type IProfileImageDisplayProps = {
  imageUrl: string;
};

const ProfileImageDisplay = memo<IProfileImageDisplayProps>(({ imageUrl }) => {
  const styles = useStyles();

  return (
    <Image
      source={{ uri: imageUrl }}
      PlaceholderContent={<ActivityIndicator />}
      containerStyle={styles.profileImageContainer}
    />
  );
});

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

ProfileImageDisplay.displayName = "ProfileImageDisplay";

export default ProfileImageDisplay;
