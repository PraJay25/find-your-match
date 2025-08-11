module.exports = {
    root: true,
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react-native/all",
      "plugin:jest/recommended",
      "prettier"
    ],
    plugins: ["@typescript-eslint", "react", "react-hooks", "react-native", "jest"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    settings: {
      react: { version: "detect" }
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/prop-types": "off"
    }
  };