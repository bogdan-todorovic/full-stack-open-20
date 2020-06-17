module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    "airbnb-base"
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    quotes: [
      "error",
      "double"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "no-param-reassign": [
      "error",
      { props: false }
    ],
    "no-underscore-dangle": [
      "error",
      { allow: ["_id", "__v"] }
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ]
  }
};
