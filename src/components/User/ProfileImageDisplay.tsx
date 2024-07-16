import { makeStyles } from "@rneui/themed";
import { memo } from "react";

import StyledImage from "../common/StyledImage";

type IProfileImageDisplayProps = {
  imageUrl: string;
  size?: number;
};

const ProfileImageDisplay = memo<IProfileImageDisplayProps>(
  ({ imageUrl, size = 60 }) => {
    const styles = useStyles(size);

    return <StyledImage source={{ uri: imageUrl }} style={styles.image} />;
  },
);

const useStyles = makeStyles((theme, size: number) => ({
  image: {
    height: size,
    width: size,
    borderRadius: size / 2,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
}));

ProfileImageDisplay.displayName = "ProfileImageDisplay";

export default ProfileImageDisplay;
