import { AntDesign } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

import { HStack, VStack } from "@/src/components/common/Stack";
import StyledScrollView from "@/src/components/common/StyledScrollView";
import { LanguageEnum, LanguageLabels } from "@/src/i18n";

const LanguageScreen = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <StyledScrollView style={styles.container}>
      <VStack alignItems="stretch">
        <Text style={styles.sectionText}>{t("LanguageScreen:warning")}</Text>
      </VStack>
      <View style={styles.section}>
        {Object.values(LanguageEnum).map((key, index) => {
          const isSelected = i18n.language === key;
          const isLast = index === Object.values(LanguageEnum).length - 1;

          return (
            <Fragment key={key}>
              <TouchableOpacity
                onPress={() => {
                  i18n.changeLanguage(key);
                }}
              >
                <HStack
                  style={[styles.item, isSelected && styles.itemSelected]}
                >
                  <Text style={styles.white}>
                    {LanguageLabels[key as LanguageEnum]}
                  </Text>
                  <AntDesign
                    name={isSelected ? "checkcircle" : "checkcircleo"}
                    size={24}
                    color={
                      isSelected ? theme.colors.success : theme.colors.divider
                    }
                  />
                </HStack>
              </TouchableOpacity>
              {!isLast && <View style={styles.divider} />}
            </Fragment>
          );
        })}
      </View>
    </StyledScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    paddingTop: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  white: {
    color: "white",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemSelected: {
    backgroundColor: theme.colors.modal,
  },
  section: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.divider,
    marginTop: 16,
  },
  sectionText: {
    fontSize: 12,
    color: theme.colors.grey1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginHorizontal: 16,
  },
}));

export default LanguageScreen;
