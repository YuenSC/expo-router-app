import { AntDesign } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
type ICurrencySelectTouchableOpacityProps = {
  onPress?: () => void;
  name: string;
  code: string;
  onDelete?: () => void;
};

const CurrencySelectTouchableOpacity =
  memo<ICurrencySelectTouchableOpacityProps>(
    ({ onPress, code, name, onDelete }) => {
      const styles = useStyles();
      const { theme } = useTheme();

      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={onPress}
          disabled={!onPress}
        >
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemCode}>{code}</Text>
          {onDelete && (
            <TouchableOpacity hitSlop={10} onPress={onDelete}>
              <AntDesign name="delete" size={20} color={theme.colors.error} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      );
    },
  );

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  itemName: {
    fontSize: 18,
    flex: 1,
  },
  itemCode: {
    fontSize: 18,
    color: theme.colors.grey3,
  },
}));

CurrencySelectTouchableOpacity.displayName = "CurrencySelectTouchableOpacity";

export default CurrencySelectTouchableOpacity;
