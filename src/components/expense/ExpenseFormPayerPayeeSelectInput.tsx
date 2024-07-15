import { makeStyles } from "@rneui/themed";
import { memo, useEffect, useState } from "react";
import { TextInput } from "react-native";

import { roundAmountToDecimal } from "@/src/utils/payments";

type IExpenseFormPayerPayeeSelectInputProps = {
  amount?: number;
  maxAmount?: number;
  setAmount: (amount: number) => void;
};
// ^: Asserts the start of the line or string.
// \d*: Matches zero or more digits (\d is a shorthand character class that matches any Arabic numeral digit; * is a quantifier that matches the preceding element zero or more times).
// \.?: Matches zero or one decimal point (. is a special character in regular expressions, so it is escaped with a backslash to match a literal period; ? is a quantifier that matches the preceding element zero or one time).
// \d*: Again, matches zero or more digits.
// $: Asserts the end of the line or string.
const decimalRegex = /^\d*\.?\d*$/;
const formatAmountAsString = (amountAsString: string) =>
  roundAmountToDecimal(parseFloat(amountAsString));

const ExpenseFormPayerPayeeSelectInput =
  memo<IExpenseFormPayerPayeeSelectInputProps>(
    ({ amount, maxAmount, setAmount }) => {
      const styles = useStyles();

      const [amountAsString, setAmountAsString] = useState("");

      const handleChangeText = (text: string) => {
        if (decimalRegex.test(text)) {
          setAmountAsString(text);
        } else {
          setAmountAsString("");
        }
      };

      useEffect(() => {
        if (!amount) {
          setAmountAsString("");
        }

        if (amount && formatAmountAsString(amountAsString) !== amount) {
          setAmountAsString(roundAmountToDecimal(amount).toString());
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
            if (formatAmountAsString(amountAsString) === amount) return;

            const newAmount = formatAmountAsString(amountAsString);
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
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
}));

ExpenseFormPayerPayeeSelectInput.displayName =
  "ExpenseFormPayerPayeeSelectInput";

export default ExpenseFormPayerPayeeSelectInput;
