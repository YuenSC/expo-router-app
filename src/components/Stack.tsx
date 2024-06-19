import { memo } from "react";
import { View, ViewProps, StyleSheet } from "react-native";

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

const stackStyles = StyleSheet.create({
  HStack: {
    flexDirection: "row",
  },
  VStack: {
    flexDirection: "column",
  },
});

const HStack = memo<IStackProps>(
  ({
    gap,
    alignItems,
    justifyContent,
    flexWrap,
    children,
    style,
    ...props
  }) => {
    return (
      <View
        {...props}
        style={[
          stackStyles.HStack,
          { alignItems, justifyContent, flexWrap, gap },
          style,
        ]}
      >
        {children}
      </View>
    );
  },
);
HStack.displayName = "HStack";

const VStack = memo<IStackProps>(
  ({
    gap,
    alignItems,
    justifyContent,
    flexWrap,
    children,
    style,
    ...props
  }) => {
    return (
      <View
        {...props}
        style={[
          stackStyles.VStack,
          { alignItems, justifyContent, flexWrap, gap },
          style,
        ]}
      >
        {children}
      </View>
    );
  },
);
VStack.displayName = "VStack";

export { HStack, VStack };
