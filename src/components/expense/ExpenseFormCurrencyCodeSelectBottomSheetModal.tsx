import { BottomSheetModal, BottomSheetSectionList } from "@gorhom/bottom-sheet";
import { Text, makeStyles } from "@rneui/themed";
import Constants from "expo-constants";
import { forwardRef, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Keyboard, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import CurrencySelectTouchableOpacity from "./CurrencySelectTouchableOpacity";
import StyledBottomSheetModal from "../common/StyledBottomSheetModal";
import StyledSearchBar from "../common/StyledSearchBar";

import { AllCurrencyCodes, CurrencyCode } from "@/src/constants/Currency";
import { useAppContext } from "@/src/context/AppContext";
import { useBottomSheetModalImperativeHandle } from "@/src/hooks/useBottomSheetModalImperativeHandle";

const snapPoints = [
  Dimensions.get("window").height - Constants.statusBarHeight,
];

type IExpenseFormCurrencyCodeSelectBottomSheetModalProps = {
  currencyCode: string;
  setCurrencyCode: (currencyCode: string) => void;
};

const ExpenseFormCurrencyCodeSelectBottomSheetModal = forwardRef<
  BottomSheetModal,
  IExpenseFormCurrencyCodeSelectBottomSheetModalProps
>(({ currencyCode, setCurrencyCode }, ref) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");

  const {
    suggestedCurrencyCodes,
    addSuggestionsCurrencyCode,
    removeSuggestionsCurrencyCode,
  } = useAppContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const sections = useMemo(() => {
    const formattedSearchText = searchText.trim().toLowerCase();

    const allCurrencyData = Object.values(AllCurrencyCodes)
      .filter((i) => i.code !== currencyCode)
      .filter((i) => !suggestedCurrencyCodes.includes(i.code))
      .filter(
        (item) =>
          item.code.toLowerCase().includes(formattedSearchText) ||
          item.name.toLowerCase().includes(formattedSearchText),
      );

    const suggestedCurrencyData = Object.values(AllCurrencyCodes).filter((i) =>
      suggestedCurrencyCodes.includes(i.code),
    );

    if (suggestedCurrencyData.length === 0) {
      return [
        {
          title: t(
            "ExpenseFormCurrencyCodeSelectBottomSheetModal:all-currency",
          ),
          data: allCurrencyData,
        },
      ];
    }

    return [
      {
        title: t(
          "ExpenseFormCurrencyCodeSelectBottomSheetModal:suggested-currency",
        ),
        data: suggestedCurrencyData,
      },
      {
        title: t("ExpenseFormCurrencyCodeSelectBottomSheetModal:all-currency"),
        data: allCurrencyData,
      },
    ];
  }, [currencyCode, searchText, suggestedCurrencyCodes, t]);

  useBottomSheetModalImperativeHandle(ref, bottomSheetModalRef);

  return (
    <StyledBottomSheetModal
      ref={bottomSheetModalRef}
      enablePanDownToClose
      snapPoints={snapPoints}
    >
      <View style={styles.searchBarContainer}>
        <StyledSearchBar
          autoFocus
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder={t(
            "ExpenseFormCurrencyCodeSelectBottomSheetModal:search-currency-code-or-name",
          )}
        />

        <View style={{ marginHorizontal: 4 }}>
          <Text style={[styles.header, styles.headerText, { marginBottom: 2 }]}>
            {t(
              "ExpenseFormCurrencyCodeSelectBottomSheetModal:selected-currency",
            )}
          </Text>
          <CurrencySelectTouchableOpacity
            code={AllCurrencyCodes[currencyCode as CurrencyCode].code}
            name={AllCurrencyCodes[currencyCode as CurrencyCode].name}
          />
        </View>
      </View>

      <BottomSheetSectionList
        keyboardDismissMode="on-drag"
        sections={sections}
        renderSectionFooter={() => <View style={{ marginVertical: 16 }} />}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainer}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.header, styles.headerText]}>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => {
          const isInSuggestionList = suggestedCurrencyCodes.includes(item.code);

          return (
            <CurrencySelectTouchableOpacity
              code={item.code}
              name={item.name}
              onPress={() => {
                bottomSheetModalRef.current?.close();
                addSuggestionsCurrencyCode(item.code);
                Keyboard.dismiss();
                setCurrencyCode(item.code);
                setSearchText("");
              }}
              onDelete={
                isInSuggestionList
                  ? () => removeSuggestionsCurrencyCode(item.code)
                  : undefined
              }
            />
          );
        }}
      />
    </StyledBottomSheetModal>
  );
});

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  searchBarContainer: {
    marginHorizontal: 12,
    marginBottom: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: insets.bottom,
  },
  header: {
    paddingBottom: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.modal,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  itemTextHighLight: {
    color: "black",
    backgroundColor: "yellow",
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: 12,
  },
}));

ExpenseFormCurrencyCodeSelectBottomSheetModal.displayName =
  "ExpenseFormCurrencyCodeSelectBottomSheetModal";

export default ExpenseFormCurrencyCodeSelectBottomSheetModal;
