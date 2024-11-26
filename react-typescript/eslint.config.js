import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

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
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
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
  eslintConfigPrettier,
);
