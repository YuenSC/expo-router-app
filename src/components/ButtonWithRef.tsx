import { ButtonProps, Button as RneuiButton } from "@rneui/themed";
import React, { forwardRef } from "react";
import { Button } from "react-native";

type IButtonWithRefProps = ButtonProps;

const ButtonWithRef = forwardRef<Button, IButtonWithRefProps>((props, ref) => {
  return <RneuiButton {...props} />;
});

ButtonWithRef.displayName = "ButtonWithRef";

export default ButtonWithRef;
