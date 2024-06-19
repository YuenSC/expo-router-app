import { ButtonProps, Colors, Theme } from "@rneui/themed";

const Button: (
  props: Partial<ButtonProps>,
  theme: Theme & {
    colors: Colors;
  },
) => Partial<ButtonProps> = (props, theme) => {
  let padding = 12;
  let paddingHorizontal = 14;
  switch (props.size) {
    case "sm":
      padding = 8;
      paddingHorizontal = 10;
      break;
    case "lg":
      padding = 14;
      paddingHorizontal = 16;
      break;
  }

  let color = theme.colors.primary;
  switch (props.type) {
    case "outline":
    case "clear":
      color = theme.colors[
        (props.color || "primary") as keyof Colors
      ] as string;
      break;

    default:
      color = theme.colors.white;
      break;
  }

  return {
    buttonStyle: {
      padding,
      paddingHorizontal,
      borderRadius: 8,
      borderColor: color,
    },
    titleStyle: {
      fontWeight: "bold",
      fontSize: 16,
      color,
    },
  };
};

export default Button;
