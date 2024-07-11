import { AntDesign } from "@expo/vector-icons";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { Pressable } from "react-native";

import { HStack } from "../common/Stack";

const OptionSectionItem = ({
  title,
  onPress,
  disabled,
  itemRight,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  itemRight?: React.ReactNode;
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.sectionItem,
        pressed && styles.sectionItemPressed,
      ]}
      disabled={disabled || !onPress}
      onPress={onPress}
    >
      <HStack style={{ minHeight: 24 }}>
        <Text>{title}</Text>
        {itemRight ? (
          itemRight
        ) : (
          <AntDesign name="arrowright" size={24} color={theme.colors.primary} />
        )}
      </HStack>
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  sectionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionItemPressed: {
    backgroundColor: theme.colors.grey5,
  },
}));

export default OptionSectionItem;
