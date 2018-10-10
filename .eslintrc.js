module.exports = {
  root: true,
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/prettier'
  ],

  rules: {
    'new-parens': 2,
    'semi': [0],
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': [0, 'linux'],
    'on-undef': 'off'
  },

  parserOptions: {
    ecmaVersion: 6,
    parser: 'babel-eslint'
  }
};
