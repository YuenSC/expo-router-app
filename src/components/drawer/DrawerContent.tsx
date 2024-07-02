import { AntDesign } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { Link } from "expo-router";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import ButtonWithRef from "../ButtonWithRef";

import Config from "@/src/Config";
import { useGetGroupList } from "@/src/api/hooks/group/useGetGroupList";

type IDrawerContentProps = DrawerContentComponentProps;

const DrawerContent = forwardRef<View, IDrawerContentProps>(
  ({ state, navigation }, ref) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const { data: groups } = useGetGroupList({
      page: 1,
      pageSize: 1000,
    });

    return (
      <SafeAreaView ref={ref} style={styles.container}>
        <FlatList
          data={groups}
          bounces={false}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={() => {
            return (
              <Text h2 style={{ marginBottom: 16 }}>
                {t("DrawerContent:groups")}
              </Text>
            );
          }}
          ListFooterComponent={() => {
            // TODO: Add a page to create a new group
            return (
              <Link asChild href="/home">
                <ButtonWithRef type="clear" size="sm">
                  <AntDesign
                    name="addusergroup"
                    size={24}
                    color={theme.colors.primary}
                  />
                  {t("DrawerContent:add-group")}
                </ButtonWithRef>
              </Link>
            );
          }}
          renderItem={({ item }) => {
            //TODO: Add a context to remember what is the current selected group
            const isCurrentGroupSelected = false;
            return (
              <TouchableOpacity
                style={[
                  styles.group,
                  isCurrentGroupSelected && styles.groupSelected,
                ]}
              >
                <Text
                  style={[isCurrentGroupSelected && styles.groupNameSelected]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <Text>
            {t("DrawerContent:version", {
              version: Config.version,
            })}
          </Text>
        </View>
      </SafeAreaView>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  group: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.modal,
  },
  groupSelected: {
    backgroundColor: theme.colors.primary,
  },
  groupNameSelected: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
}));

DrawerContent.displayName = "DrawerContent";

export default DrawerContent;
