import { makeStyles, Text } from "@rneui/themed";
import { memo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

import { HStack } from "../common/Stack";

type IGroupDetailSectionProps = ViewProps & {
  title: string;
  titleRight?: React.ReactNode;
  titleContainerStyle?: StyleProp<ViewStyle>;
};

const GroupDetailSection = memo<IGroupDetailSectionProps>(
  ({ children, title, titleRight, titleContainerStyle, ...rest }) => {
    const styles = useStyles();

    return (
      <View {...rest} style={[styles.container, rest.style]}>
        <HStack style={titleContainerStyle}>
          <Text style={styles.label}>{title}</Text>
          {titleRight}
        </HStack>
        {children}
      </View>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
}));

GroupDetailSection.displayName = "GroupDetailSection";

export default GroupDetailSection;
