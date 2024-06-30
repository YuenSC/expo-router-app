module.exports = {
  root: true,
  extends: ["universe/native", "plugin:react-hooks/recommended"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text", "Image"],
            message: "Please use Text from rneui instead.",
          },
          {
            name: "@rneui/base",
            message: "Please use @rneui/theme instead.",
          },
          {
            name: "@rneui/themed",
            importNames: ["Image"],
            message: "Please use StyledImage instead.",
          },
        ],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
