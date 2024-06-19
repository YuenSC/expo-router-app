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
    divider: "#DDD",
    error: "#f75959",
    success: "#82ff05",
  },
  mode: "dark",
  components: {
    Button,
    Input: () => ({
      keyboardAppearance: "dark",
    }),
  },
});

export default theme;
