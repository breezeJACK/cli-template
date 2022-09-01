module.exports = {
  extends: ['alloy', 'alloy/vue', 'alloy/typescript'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    browser: true
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
    'no-undef': 'off',
    'no-eval': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/valid-template-root': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: false,
        disallowVue3BuiltInComponents: false
      }
    ],
    'vue/v-on-function-call': [
      'always',
      {
        ignoreIncludesComment: true
      }
    ]
  }
};
