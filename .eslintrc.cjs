module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'love',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['form.Field'],
      },
    ],
    'vue/multi-word-component-names': ['off'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    '@typescript-eslint/require-await': 'off', // インターフェースでawaitが必要だが実装では必要としないケースがあるためoff
    '@typescript-eslint/consistent-type-assertions': 'off', // as で型を指定したいことがあるためoff
    '@typescript-eslint/explicit-function-return-type': 'off', // composableの中など書ききれないときがあるのでoff
    '@typescript-eslint/promise-function-async': 'off', // useFetchを利用する場面ではasyncを付けずに利用することがあるためoff
  },
}
