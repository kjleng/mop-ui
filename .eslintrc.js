module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'testing-library', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // We need this to get prettier working with eslint

    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'prefer-template': 'error',
    'no-useless-concat': 'error',

    'comma-dangle': [1, 'only-multiline'],
    'sort-imports': 'off',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'], // Built-in, external, and internal types are first, mingled together
          ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
          'index', // Then the index file
          'object',
          // Then the rest: unknown type
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    //'react/react-in-jsx-scope': 'off', // We don't need to import React when using Next.js
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-props-no-spreading': 'off', // Allows us to spread props

    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
        readonly: 'generic',
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/no-onchange': 0,
  },
};
