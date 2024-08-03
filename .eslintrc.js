module.exports = {
  root: true,
  extends: [
    "universe/native",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["@tanstack/query"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text", "Image", "ScrollView"],
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
