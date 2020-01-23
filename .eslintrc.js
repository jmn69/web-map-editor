const path = require("path");

module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      generators: true,
      experimentalObjectRestSpread: true
    },
    sourceType: "module",
    allowImportExportEverywhere: false
  },
  plugins: ["jsx-a11y"],
  extends: ["react-app", "airbnb", "plugin:jsx-a11y/recommended", "prettier"],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    },
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "src")],
        extensions: [".js", ".json", ".styl"]
      }
    }
  },
  globals: {
    window: true,
    document: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    jest: true,
    describe: true,
    test: true,
    it: true,
    expect: true,
    beforeEach: true,
    fetch: true,
    alert: true,
    arguments: true,
    localStorage: true,
    navigator: true
  },
  rules: {
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
        styl: "never",
        css: "never"
      }
    ],
    "no-shadow": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "react/prop-types": 0,
    "react/static-property-placement": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/no-render-return-value": 0,
    "no-confusing-arrow": 0,
    "no-underscore-dangle": 0,
    "no-plusplus": 0,
    camelcase: 1,
    "prefer-template": 1,
    "prefer-destructuring": 0,
    "react/forbid-prop-types": 0,
    "function-paren-newline": 0,
    "react/prefer-stateless-function": 0,
    "react/no-array-index-key": 1,
    "react/jsx-props-no-spreading": 0,
    "global-require": 1,
    "react/jsx-indent": 1,
    "dot-notation": 1,
    "import/no-named-default": 1,
    "no-unused-vars": 1,
    "no-mixed-operators": 0,
    "flowtype/no-weak-types": 1,
    "consistent-return": 0,
    "import/prefer-default-export": 1,
    "import/no-webpack-loader-syntax": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-onchange": 0,
    "no-console": 1,
    "no-case-declarations": 1,
    "jsx-quotes": [2, "prefer-single"],
    "react/jsx-filename-extension": [2, { extensions: [".jsx", ".js"] }],
    "spaced-comment": [2, "always", { markers: ["?"] }],
    "arrow-parens": [2, "as-needed", { requireForBlockBody: false }],
    "brace-style": [2, "stroustrup"],
    "import/no-unresolved": 0,
    "no-unused-expressions": [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true
      }
    ],
    "max-len": [
      "error",
      {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    "react/no-children-prop": 1,
    "react/no-did-update-set-state": 0,
    "react/jsx-fragments": 0,
    "react/state-in-constructor": 0,
    "react/sort-comp": [
      2,
      {
        order: [
          "propTypes",
          "props",
          "state",
          "defaultProps",
          "contextTypes",
          "childContextTypes",
          "getChildContext",
          "static-methods",
          "lifecycle",
          "render",
          "everything-else"
        ]
      }
    ],
    "linebreak-style": 0,
    "jsx-a11y/media-has-caption": 0
  }
};
