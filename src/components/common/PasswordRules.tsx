import { Ionicons } from "@expo/vector-icons";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { View } from "react-native";

import { HStack } from "./Stack";

export type Rule = {
  id: string;
  test: (pw: string) => boolean;
  message: string;
};

type IPasswordRulesProps = {
  password: string;
  rules: Rule[];
};

const PasswordRules = ({ password, rules }: IPasswordRulesProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View>
      {rules.map((rule) => (
        <HStack gap={4} key={rule.id} style={styles.ruleContainer}>
          <Ionicons
            name={rule.test(password) ? "checkmark-circle" : "close-circle"}
            size={20}
            color={
              rule.test(password) ? theme.colors.success : theme.colors.error
            }
          />
          <Text style={styles.ruleText}>{rule.message}</Text>
        </HStack>
      ))}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  ruleContainer: {},
  ruleText: {},
}));

PasswordRules.displayName = "PasswordRules";

export default PasswordRules;
