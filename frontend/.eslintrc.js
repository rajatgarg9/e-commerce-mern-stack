module.exports = {
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "airbnb",
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
    "import/no-unresolved": "error",
    "arrow-body-style": "off", // for prettier plugin
    "prefer-arrow-callback": "off", // for prettier plugin
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [2, { extensions: [".tsx"] }],
    "no-unused-vars": 2,
    "import/extensions": 0,
  },
};
