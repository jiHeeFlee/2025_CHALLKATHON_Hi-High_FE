import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import next from '@next/eslint-plugin-next';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: globals.browser
    },
    plugins: {
      js,
      tseslint,
      react,
      next
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'next/no-html-link-for-pages': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  },
  js.configs.recommended,
  tseslint.configs['recommended'], // 배열 문제 해결
  react.configs.recommended,
  next.configs.recommended
];
