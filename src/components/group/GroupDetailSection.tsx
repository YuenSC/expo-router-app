import { makeStyles, Text } from "@rneui/themed";
import { memo } from "react";
import { View, ViewProps } from "react-native";

type IGroupDetailSectionProps = ViewProps & {
  title: string;
};

const GroupDetailSection = memo<IGroupDetailSectionProps>(
  ({ children, title, ...rest }) => {
    const styles = useStyles();

    return (
      <View {...rest} style={[styles.container, rest.style]}>
        <Text style={styles.label}>{title}</Text>
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
