module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: [".eslintrc.js", ".eslintrc.cjs", "vite.config.ts"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": "warn",
    "no-useless-concat": "off",
    "testing-library/no-node-access": "off",
    "import/order": "warn",
    "import/no-unresolved": "off",
    "import/named": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        shorthandFirst: true,
        callbacksLast: true,
        multiline: "last",
        reservedFirst: true,
      },
    ],
    "react/self-closing-comp": "warn",
  },
};
