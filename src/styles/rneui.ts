import { createTheme } from "@rneui/themed";

import Button from "./components/Button";

const theme = createTheme({
  lightColors: {
    black: "#000",
    backdrop: "rgba(0, 0, 0, 0.5)",
    modal: "#10113d",
  },
  darkColors: {
    black: "#ffffff",
    backdrop: "rgba(255, 255, 255, 0.2)",
    background: "#050624",
    modal: "#10113d",
    primary: "#f6d146",
    divider: "#D6D6D6",
    error: "#f75959",
    success: "#82ff05",
  },
  mode: "dark",
  components: {
    Button,
    Dialog: ({ overlayStyle }, theme) => ({
      overlayStyle: [
        {
          backgroundColor: theme.colors.modal,
        },
        overlayStyle,
      ],
    }),
    DialogTitle: ({ titleStyle }, theme) => ({
      titleStyle: [
        {
          color: theme.colors.primary,
          fontWeight: "bold",
        },
        titleStyle,
      ],
    }),
    DialogButton: ({ style }) => ({
      style: [
        {
          minHeight: 40,
        },
        style,
      ],
    }),
    Input: () => ({
      keyboardAppearance: "dark",
    }),
  },
});

export default theme;
