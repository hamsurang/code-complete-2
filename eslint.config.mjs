// ESLint 9 flat config
// Why: Docusaurus 3.9는 ESLint 9+ 를 지원한다. 이 설정은 에이전트가 MDX/TSX 생성 시
// 실수를 CI에서 차단하기 위한 최소한의 가드레일이다.
// 에러 포맷은 --format compact로 에이전트가 파싱하기 쉽게 한다.

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import * as mdx from 'eslint-plugin-mdx';

export default [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      '.docusaurus/**',
      '_workspace/**',
      '.claude/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      'react/jsx-key': 'error',
      'react/no-array-index-key': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{md,mdx}'],
    ...mdx.flat,
    rules: {
      ...mdx.flat.rules,
    },
  },
];
