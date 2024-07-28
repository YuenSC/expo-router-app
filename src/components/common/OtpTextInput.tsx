import { makeStyles, Text } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { Dimensions, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

import { HStack } from "./Stack";

type IOtpTextInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  numberOfDigits?: number;
  onComplete?: (text: string) => void;
};

const OtpTextInputConfig = {
  margin: 32,
  gap: 16,
  getMaxBoxSize: (numberOfDigits: number) => {
    const screenWidth = Dimensions.get("window").width;
    const { margin, gap } = OtpTextInputConfig;
    return (
      (screenWidth - margin * 2 - gap * (numberOfDigits - 1)) / numberOfDigits
    );
  },
};

const OtpTextInput = ({
  value,
  onChangeText,
  numberOfDigits = 6,
  onComplete,
}: IOtpTextInputProps) => {
  const maxBoxSize = OtpTextInputConfig.getMaxBoxSize(numberOfDigits);
  const styles = useStyles(maxBoxSize);
  const [focusedInputIndex, setFocusedInputIndex] = useState(-1);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (value === "") {
      setFocusedInputIndex(0);
      inputRef.current?.focus();
    }
  }, [value]);

  return (
    <HStack style={styles.inputContainer}>
      {Array.from(Array(numberOfDigits).keys()).map((index) => (
        <DigitBox
          key={index}
          maxBoxSize={maxBoxSize}
          value={value[index] || ""}
          focused={focusedInputIndex === index}
        />
      ))}
      <TextInput
        autoFocus
        ref={inputRef}
        style={styles.hiddenTextInput}
        selectionColor="transparent"
        keyboardType="numeric"
        value={value}
        maxLength={numberOfDigits}
        onChangeText={(text) => {
          onChangeText(text);
          setFocusedInputIndex(text.length);

          if (text.length === numberOfDigits) {
            inputRef.current?.blur();
            onComplete?.(text);
          }
        }}
        onFocus={() =>
          setFocusedInputIndex(Math.min(focusedInputIndex, numberOfDigits - 1))
        }
      />
    </HStack>
  );
};

const DigitBox = ({
  value,
  focused,
  maxBoxSize,
}: {
  value: string;
  focused: boolean;
  maxBoxSize: number;
}) => {
  const styles = useStyles(maxBoxSize);

  const selectionStyle = useAnimatedStyle(() => {
    return {
      opacity: focused
        ? withRepeat(withSpring(1, { duration: 400 }), -1, true)
        : 0,
    };
  });

  return (
    <View style={[styles.input, focused && styles.inputFocused]}>
      {value && (
        <Text style={[styles.inputText, focused && styles.inputFocused]}>
          {value}
        </Text>
      )}
      {!value && focused && (
        <Animated.View style={[styles.selection, selectionStyle]} />
      )}
    </View>
  );
};

const useStyles = makeStyles((theme, maxBoxSize: number) => ({
  inputContainer: {
    gap: 16,
  },
  input: {
    height: Math.min(maxBoxSize, 45),
    width: Math.min(maxBoxSize, 45),
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    color: theme.colors.black,
    fontSize: 20,
    textAlign: "center",
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  hiddenTextInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    opacity: 0,
  },
  selection: {
    height: "70%",
    width: 1,
    opacity: 0,
    backgroundColor: theme.colors.primary,
  },
}));

OtpTextInput.displayName = "OtpTextInput";

export default OtpTextInput;
