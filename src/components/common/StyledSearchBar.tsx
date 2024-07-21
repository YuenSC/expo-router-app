import { Ionicons } from "@expo/vector-icons";
import { SearchBar, SearchBarProps, makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";

type IStyledSearchBarProps = SearchBarProps;

const StyledSearchBar = memo<IStyledSearchBarProps>(
  ({ value, onChangeText, inputStyle, containerStyle, ...props }) => {
    const styles = useStyles();
    const { theme } = useTheme();

    return (
      <SearchBar
        platform="ios"
        cancelButtonProps={styles.whiteColor}
        searchIcon={
          <Ionicons name="search" size={20} color={theme.colors.grey3} />
        }
        clearIcon={
          value ? (
            <TouchableOpacity onPress={() => onChangeText?.("")}>
              <Ionicons name="close" size={20} color={theme.colors.grey3} />
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
        {...props}
        value={value}
        onChangeText={onChangeText}
        inputStyle={[styles.whiteColor, inputStyle]}
        containerStyle={[styles.container, containerStyle]}
        placeholderTextColor={theme.colors.grey2}
      />
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.modal,
    marginHorizontal: -4,
  },
  whiteColor: {
    color: theme.colors.black,
  },
}));

StyledSearchBar.displayName = "StyledSearchBar";

export default StyledSearchBar;
