import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  label?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = "default",
  label,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderTextColor = useThemeColor(
    { light: undefined, dark: undefined },
    "placeholder"
  );

  return (
    <View>
      {label && <ThemedText>{label}</ThemedText>}
      <TextInput
        placeholderTextColor={placeholderTextColor}
        style={[{ color }, styles.default]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    padding: 8,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 16,
  },
});
