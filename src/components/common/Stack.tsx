import { makeStyles } from "@rneui/themed";
import { memo } from "react";
import { View, ViewProps } from "react-native";

type CustomStyles = {
  gap?: number;
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
};

type IStackProps = ViewProps & CustomStyles;

const HStack = memo<IStackProps>(
  ({ gap, alignItems, justifyContent, flexWrap, children, ...props }) => {
    const styles = useStyles({
      gap,
      alignItems,
      justifyContent,
      flexWrap,
      stack: "HStack",
    });

    return (
      <View {...props} style={[styles.stackContainer, props.style]}>
        {children}
      </View>
    );
  },
);
HStack.displayName = "HStack";

const VStack = memo<IStackProps>(
  ({ gap, alignItems, justifyContent, flexWrap, children, ...props }) => {
    const styles = useStyles({
      gap,
      alignItems,
      justifyContent,
      flexWrap,
      stack: "VStack",
    });

    return (
      <View {...props} style={[styles.stackContainer, props.style]}>
        {children}
      </View>
    );
  },
);
VStack.displayName = "VStack";

const useStyles = makeStyles(
  (
    theme,
    style: CustomStyles & {
      stack: "VStack" | "HStack";
    },
  ) => ({
    stackContainer: {
      gap: style.gap,
      flexDirection: style.stack === "HStack" ? "row" : "column",
      alignItems: style.alignItems || "center",
      justifyContent: style.justifyContent || "space-between",
      flexWrap: style.flexWrap || "nowrap",
    },
  }),
);

export { HStack, VStack };
