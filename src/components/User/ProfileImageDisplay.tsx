import { makeStyles } from "@rneui/themed";
import { memo } from "react";

import StyledImage from "../common/StyledImage";

type IProfileImageDisplayProps = {
  imageUrl: string;
  size?: number;
};

const ProfileImageDisplay = memo<IProfileImageDisplayProps>(
  ({ imageUrl, size }) => {
    const styles = useStyles(size);

    return <StyledImage source={{ uri: imageUrl }} style={styles.image} />;
  },
);

const useStyles = makeStyles((theme, size?: number) => ({
  image: {
    height: size ?? 60,
    width: size ?? 60,
    borderRadius: (size ?? 30) / 2,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
}));

ProfileImageDisplay.displayName = "ProfileImageDisplay";

export default ProfileImageDisplay;
