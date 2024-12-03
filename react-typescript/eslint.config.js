import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'public', '.prettierrc'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        // type 키워드를 포함한 import는 import type 형식을 강제
        {
          selector: "ImportDeclaration ImportSpecifier[importKind='type']",
          message:
            "Do not use 'type' imports inside regular import declarations. Use 'import type' instead.",
        },
      ],
    },
  },
  {
    plugins: tseslint.plugin,
    rules: {
      '@typescript-eslint/array-type': 'error', // 배열 선언 방식 명확하게
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 X
      '@typescript-eslint/no-unsafe-function-type': 'off', // 안전하지 않은 함수 타입 사용 허용
      '@typescript-eslint/no-empty-object-type': 'off', // 빈 객체 타입 허용 => {}
      '@typescript-eslint/consistent-type-imports': 'error', // type import 강제
      '@typescript-eslint/no-unused-expressions': 'off', // 사용되지 않는 표현식 사용 허용
      '@typescript-eslint/naming-convention': [
        'error',
        // 클래스, 인터페이스, 타입 별칭, enum은 PascalCase
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },
  eslintConfigPrettier, // Prettier와 ESLint 규칙 충돌 방지
  {
    plugins: { import: eslintPluginImport },
    rules: {
      'import/no-duplicates': 'error', // 중복된 import 금지
    },
  },
  {
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: ['@/**'], // 내부 경로 패턴
          newlinesBetween: 'always', // 그룹 간 빈 줄 추가
          groups: [
            'react',
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              react: ['react', 'react-*'],
            },
            type: {
              react: ['react', 'react-*'],
            },
          },
        },
      ],
      'perfectionist/sort-named-imports': 'error', // 이름 지정 import 정렬
      'perfectionist/sort-exports': 'error', // export 정렬
      'perfectionist/sort-named-exports': 'error', // 이름 지정 export 정렬
    },
  },
);
