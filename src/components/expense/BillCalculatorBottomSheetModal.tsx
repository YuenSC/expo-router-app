import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Pressable, TouchableOpacity, Vibration, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import StyledBottomSheetModal from "../common/StyledBottomSheetModal";
import StyledBottomSheetView from "../common/StyledBottomSheetView";

import {
  CalculatorButtons,
  CalculatorOperands,
  CalculatorRecord,
  calculateResult,
} from "@/src/utils/calculator";

type IBillCalculatorBottomSheetModalProps = {
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  onBlurInput: () => void;
  defaultValue?: number;
};

const BillCalculatorBottomSheetModal = forwardRef<
  BottomSheetModal,
  IBillCalculatorBottomSheetModalProps
>(({ value, onChange, onBlurInput, defaultValue }, outerRef) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  useImperativeHandle(outerRef, () => bottomSheetRef.current!, []);

  const [records, setRecords] = useState<CalculatorRecord[]>([
    {
      num: value.toString(),
      sign: undefined,
    },
  ]);

  const calculationResult = calculateResult(records);

  const calculationStepText = useMemo(() => {
    const steps = records
      .map(({ num, sign }, index) => {
        const isLast = index === records.length - 1;
        return sign ? `${num} ${sign}${isLast ? " 💰" : ""}` : num;
      })
      .join(" ");

    const result = records.length > 1 ? ` = ${calculationResult}` : "";

    const fullText = steps + result;

    return fullText ? fullText : t("BillCalculatorBottomSheet:enter-something");
  }, [calculationResult, records, t]);

  const onNumberClick = async (key: string) => {
    const recordCopy = [...records];
    const lastRecord = recordCopy[records.length - 1];

    // Case 1: Start typing the first number -> !lastRecord
    // Case 2: Typed n-th number and n-th sign -> lastRecord.sign is some string
    if (!lastRecord || Boolean(lastRecord?.sign)) {
      if (key === "0") {
        return;
      }
      const newRecords = [...records, { num: key, sign: undefined }];
      setRecords(newRecords);
      return;
    }

    // Case 3: Current decimal place is more than two
    if (
      lastRecord.num.includes(".") &&
      lastRecord.num.split(".")[1].length >= 2
    ) {
      Vibration.vibrate();
      return;
    }

    // Case 4: Current num is larger than 100000
    if (Number(lastRecord.num + key) > 1_000_000) {
      Vibration.vibrate();
      return;
    }

    // Else Case: Entering number
    lastRecord.num = lastRecord.num === "0" ? key : lastRecord.num + key;
    setRecords(recordCopy);
  };

  const onDotClick = () => {
    const recordCopy = [...records];
    const lastRecord = recordCopy[records.length - 1];

    if (lastRecord.num.includes(".")) return;

    lastRecord.num = lastRecord.num + ".";
    setRecords(recordCopy);
  };

  const onMathSignClick = (
    key:
      | CalculatorOperands.divide
      | CalculatorOperands.multiply
      | CalculatorOperands.minus
      | CalculatorOperands.plus,
  ) => {
    const recordCopy = [...records];
    const lastRecord = recordCopy[records.length - 1];

    if (!lastRecord) return;
    if (!lastRecord.num) return;

    lastRecord.sign = key;
    setRecords(recordCopy);
  };

  const onClearEntry = () => {
    const recordCopy = [...records];
    const lastRecord = recordCopy[records.length - 1];

    if (!lastRecord) return;

    if (lastRecord?.sign) {
      lastRecord.sign = undefined;
    } else {
      if (lastRecord.num.length > 1) {
        lastRecord.num = lastRecord.num.slice(0, lastRecord.num.length - 1);
      } else {
        recordCopy.pop();
      }
    }

    setRecords(recordCopy);
  };

  const onAllClear = () => {
    setRecords([]);
    onChange(0);
  };

  useEffect(() => {
    onChange(calculationResult);
  }, [calculationResult, onChange]);

  useEffect(() => {
    if (defaultValue) {
      setRecords([{ num: defaultValue.toString(), sign: undefined }]);
    }
  }, [defaultValue]);

  return (
    <StyledBottomSheetModal
      enablePanDownToClose
      enableDynamicSizing
      ref={bottomSheetRef}
      handleComponent={() => null}
      index={0}
      containerStyle={styles.container}
      onChange={(index) => index === -1 && onBlurInput()}
    >
      <StyledBottomSheetView>
        <View style={styles.bottomSheetInnerContainer}>
          <View style={styles.calculatorResultRow}>
            <Text style={styles.calculatorResultText}>
              {calculationStepText}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setRecords([
                  { num: calculateResult(records).toString(), sign: undefined },
                ]);
                bottomSheetRef.current?.close();
                onBlurInput();
              }}
            >
              <Text style={styles.calculatorResultDone}>
                {t("BillCalculatorBottomSheet:done")}
              </Text>
            </TouchableOpacity>
          </View>
          {CalculatorButtons.map((row, index) => (
            <View key={index} style={styles.buttonRow}>
              {row.map((key) => (
                <Pressable
                  key={key}
                  style={({ pressed }) => [
                    styles.calculatorButton,
                    pressed && styles.calculatorButtonPressed,
                  ]}
                  onLongPress={() => {
                    if (key === CalculatorOperands.clearEntry) {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                      onAllClear();
                    }
                  }}
                  onPressIn={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  onPress={() => {
                    switch (key) {
                      case CalculatorOperands.clearEntry:
                        onClearEntry();
                        break;
                      case CalculatorOperands.dot:
                        onDotClick();
                        break;
                      case CalculatorOperands.plus:
                      case CalculatorOperands.minus:
                      case CalculatorOperands.divide:
                      case CalculatorOperands.multiply:
                        onMathSignClick(key);
                        break;
                      default:
                        onNumberClick(key);
                    }
                  }}
                >
                  {key === CalculatorOperands.clearEntry ? (
                    <Feather
                      name="delete"
                      color={theme.colors.white}
                      size={25}
                    />
                  ) : (
                    <Text style={styles.calculatorButtonText}>{key}</Text>
                  )}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </StyledBottomSheetView>
    </StyledBottomSheetModal>
  );
});

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  container: {
    backgroundColor: "transparent",
  },
  bottomSheetInnerContainer: {
    paddingBottom: Math.max(16, insets.bottom),
    gap: 10,
  },
  calculatorResultRow: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  calculatorResultText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  calculatorResultDone: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 4,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    paddingHorizontal: "5%",
  },
  calculatorButton: {
    width: "17%",
    aspectRatio: 1,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
  calculatorButtonPressed: {
    backgroundColor: theme.colors.grey4,
    opacity: 0.5,
  },
  calculatorButtonText: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: "700",
  },
}));

BillCalculatorBottomSheetModal.displayName = "BillCalculatorBottomSheetModal";

export default memo(BillCalculatorBottomSheetModal);
