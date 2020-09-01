module.exports = {
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parser: "babel-eslint",
  "ignorePatterns": [
    "node_modules/",
    ".eslintrc.cjs"
  ],
  "plugins": [
    "react",
    "import",
    "testing-library"
  ],
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"]
}
