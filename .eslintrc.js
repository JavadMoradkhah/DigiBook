module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-await-in-loop': 'error',
    'no-const-assign': 'error',
    'no-dupe-keys': 'error',
    'no-plusplus': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'prefer-arrow-callback': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
    'linebreak-style': ['off'],
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val|err' }],
  },
};
