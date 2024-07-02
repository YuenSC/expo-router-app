import { makeStyles } from "@rneui/themed";
import { memo } from "react";

import StyledImage from "../common/StyledImage";

type IProfileImageDisplayProps = {
  imageUrl: string;
};

const ProfileImageDisplay = memo<IProfileImageDisplayProps>(({ imageUrl }) => {
  const styles = useStyles();

  return <StyledImage source={{ uri: imageUrl }} style={styles.image} />;
});

const useStyles = makeStyles((theme) => ({
  image: {
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
