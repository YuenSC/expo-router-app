import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, InputProps } from "@rneui/themed";
import { memo, useState } from "react";

type IPasswordInputProps = InputProps;

const PasswordInput = memo<IPasswordInputProps>((props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Input
      {...props}
      secureTextEntry={!showPassword}
      rightIcon={
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="grey"
          onPress={toggleShowPassword}
        />
      }
    />
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
