import { makeStyles } from "@rneui/themed";
import { memo, useEffect, useState } from "react";
import { TextInput } from "react-native";

import { roundAmountToDecimal } from "@/src/utils/payments";

type IExpenseFormPayerPayeeSelectInputProps = {
  amount?: number;
  maxAmount?: number;
  setAmount: (amount: number) => void;
};
// Updated regex to allow commas as thousand separators:
// ^: Asserts the start of the line or string.
// \d{1,3}: Matches between one and three digits at the beginning to accommodate numbers less than 1000 without a comma.
// (,\d{3})*: Matches zero or more groups of a comma followed by exactly three digits, allowing for comma as thousand separators.
// \.?: Matches zero or one decimal point. The decimal point is optional.
// \d*: Matches zero or more digits following the decimal point, if present.
// $: Asserts the end of the line or string.
const decimalRegex = /^\d{1,3}(,\d{3})*(\.\d+)?$/;

const ExpenseFormPayerPayeeSelectInput =
  memo<IExpenseFormPayerPayeeSelectInputProps>(
    ({ amount, maxAmount, setAmount }) => {
      const styles = useStyles();

      const [amountAsString, setAmountAsString] = useState("");

      const handleChangeText = (text: string) => {
        const textWithProperComma = parseFloat(
          text.replace(/,/g, ""),
        ).toLocaleString();

        if (text && decimalRegex.test(textWithProperComma)) {
          setAmountAsString(textWithProperComma);
        } else {
          setAmountAsString("");
        }
      };

      useEffect(() => {
        if (!amount) {
          setAmountAsString("");
        }

        if (amount && parseFloat(amountAsString) !== amount) {
          setAmountAsString(roundAmountToDecimal(amount).toLocaleString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [amount]);

      return (
        <TextInput
          keyboardType="numeric"
          placeholder="0"
          hitSlop={{ top: 20, bottom: 20, left: 50 }}
          value={amountAsString}
          style={styles.input}
          onChangeText={handleChangeText}
          onBlur={() => {
            const newAmount = parseFloat(amountAsString.replace(/,/g, ""));

            if (!amountAsString) return;
            if (newAmount === amount) return;

            if (maxAmount && newAmount > maxAmount) {
              setAmount(maxAmount);
              setAmountAsString(maxAmount.toString());
              return;
            }
            setAmountAsString(newAmount.toString());
            setAmount(newAmount);
          }}
          selection={{
            start: amountAsString.toString().length,
            end: amountAsString.toString().length,
          }}
        />
      );
    },
  );

const useStyles = makeStyles((theme) => ({
  input: {
    textAlign: "right",
    color: theme.colors.black,
    height: "100%",
    fontSize: 16,
  },
  hidden: { opacity: 0 },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
}));

ExpenseFormPayerPayeeSelectInput.displayName =
  "ExpenseFormPayerPayeeSelectInput";

export default ExpenseFormPayerPayeeSelectInput;
