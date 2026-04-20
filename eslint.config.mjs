// ESLint 9 flat config
// Why: Docusaurus 3.9는 ESLint 9+ 를 지원한다. 이 설정은 에이전트가 MDX/TSX 생성 시
// 실수를 CI에서 차단하기 위한 최소한의 가드레일이다.
// 포맷터는 ESLint 9 기본(stylish) 사용. `compact`는 ESLint 9에서 core에서 분리되어
// 별도 패키지 설치가 필요한데, stylish도 파일·라인 단위 출력이라 파싱에 충분하다.

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import * as mdx from 'eslint-plugin-mdx';
import globals from 'globals';

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
    // Node 스크립트: scripts/*.js, *.config.{js,mjs,ts}
    // Why: verify-human-only-hash.js 등 Node 런타임 전제 파일에 process/console globals 공급.
    files: ['scripts/**/*.{js,mjs,cjs}', '*.config.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
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
      // MDX의 `import Foo from ...`은 본문 JSX(<Foo />)에서 쓰이지만
      // ESLint가 그 사용을 추적하지 못해 false-positive `no-unused-vars`가 발생한다.
      // MDX 파일에 한해 룰을 비활성화한다.
      'no-unused-vars': 'off',
    },
  },
];
