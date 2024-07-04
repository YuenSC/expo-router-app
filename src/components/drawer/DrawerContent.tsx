import { AntDesign } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { Link } from "expo-router";
import { forwardRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import ButtonWithRef from "../common/ButtonWithRef";
import EmptyComponent from "../common/EmptyComponent";

import Config from "@/src/Config";
import { useGetGroupList } from "@/src/api/hooks/group/useGetGroupList";
import { useAppContext } from "@/src/context/AppContext";

type IDrawerContentProps = DrawerContentComponentProps;

const DrawerContent = forwardRef<View, IDrawerContentProps>(
  ({ state, navigation }, ref) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const { currentGroupId, setCurrentGroupId } = useAppContext();

    const {
      data: groups,
      query: { isError },
    } = useGetGroupList({
      page: 1,
      pageSize: 1000,
    });

    const handleGroupNotFound = useCallback(
      (hasResetTheFirstGroup?: boolean) => {
        setCurrentGroupId(null);
        Toast.show({
          type: "error",
          text1: t("common:error"),
          text2: hasResetTheFirstGroup
            ? t("DrawerContent:group-not-found-reset")
            : t("DrawerContent:group-not-found"),
        });
      },
      [setCurrentGroupId, t],
    );

    useEffect(() => {
      if (currentGroupId && isError) {
        handleGroupNotFound();
      }
    }, [isError, handleGroupNotFound, t, currentGroupId]);

    useEffect(() => {
      if (isError || groups.length === 0) return;

      if (!currentGroupId) {
        setCurrentGroupId(groups[0].id);
        return;
      }

      if (groups.find((group) => group.id === currentGroupId) === undefined) {
        handleGroupNotFound(true);
        setCurrentGroupId(groups[0].id);
      }
    }, [
      currentGroupId,
      groups,
      setCurrentGroupId,
      handleGroupNotFound,
      t,
      isError,
    ]);

    return (
      <SafeAreaView ref={ref} style={styles.container}>
        <FlatList
          data={groups}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={() => (
            <EmptyComponent emptyText={t("DrawerContent:no-group-found")} />
          )}
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
              <Link asChild href="/group/create">
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
            const isCurrentGroupSelected = item.id === currentGroupId;
            return (
              <TouchableOpacity
                style={[
                  styles.group,
                  isCurrentGroupSelected && styles.groupSelected,
                ]}
                onPress={() => setCurrentGroupId(item.id)}
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
