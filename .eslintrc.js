/**
 * Created by HCW on 2018/3/22.
 */
module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "env": {
        browser: true,
        node: true,
        es6: true
    },
    "settings": {
      "react": {
        "version": "16.3.2", // React version, default to the latest React stable release
      }
    },
    // overrides
    "rules": {
        // ...
      'no-console': 'off',
    },
    "plugins": [
      "react",
      "html"
    ],
}