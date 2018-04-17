/**
 * Created by HCW on 2018/3/22.
 */
module.exports = {
    "extends": 'eslint:recommended',
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

    // overrides
    "rules": {
        // ...
      'no-console': 'off',
    }
}