module.exports = {
   env: { browser: true, es2022: true },
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "standard"
   ],
   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
   settings: { react: { version: "18.2" } },
   plugins: ["react-refresh", "react"],
   rules: {
      "react-refresh/only-export-components": "warn",
      "multiline-ternary": "off",
      indent: "off",
      semi: [2, "always"],
      "space-before-function-paren": [
         "error",
         { anonymous: "always", named: "never" }
      ],
      quotes: ["error", "double", { allowTemplateLiterals: true }]
   }
};
