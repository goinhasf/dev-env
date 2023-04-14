/** @type {import('@types/eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      excludedFiles: ["*.js", "vite.config.ts"],
    },
  ],
  plugins: ["@typescript-eslint", "react"],
};
