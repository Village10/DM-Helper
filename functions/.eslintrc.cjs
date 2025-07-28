module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "max-len": ["error", { "code": 110 }],
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": ["error", "windows"],
    "prefer-arrow-callback": "error",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
