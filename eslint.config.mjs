import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json'
      },
      globals: globals.browser
    },
    plugins: {
      js,
      tsPlugin,
      react,
      nextPlugin
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'next/no-html-link-for-pages': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  },
  js.configs.recommended,
  tsPlugin.configs.recommended,
  react.configs.recommended,
  nextPlugin.configs.recommended
];
