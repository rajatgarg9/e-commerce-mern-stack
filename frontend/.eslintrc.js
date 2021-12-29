module.exports = {
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js", "next.config.js"],
  settings: {
    next: {
      rootDir: "./",
    },
    "import/resolver": {
      typescript: {
        project: ".",
      },
    },
  },
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off", // for prettier plugin
    "prefer-arrow-callback": "off", // for prettier plugin
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [2, { extensions: [".tsx"] }],
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "default-param-last": 0,
    // note you must disable the base rule as it can report incorrect errors
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["draft"] },
    ],
    "no-plusplus": 0,
  },
};
