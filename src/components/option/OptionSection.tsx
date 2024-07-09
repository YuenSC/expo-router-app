import { makeStyles, Text } from "@rneui/themed";
import { Fragment } from "react";
import { View } from "react-native";

const OptionSection = ({
  title,
  sections,
}: {
  title: string;
  sections: React.ReactNode[];
}) => {
  const styles = useStyles();

  return (
    <View>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.section}>
        {sections.map((section, index) => {
          const isLast = index === sections.length - 1;
          return (
            <Fragment key={index}>
              {section}
              {isLast ? null : <View style={styles.divider} />}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.divider,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: 16,
  },
}));

export default OptionSection;
