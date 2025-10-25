import { FlatCompat } from '@eslint/eslintrc';
// Use the *flat* export of eslint-config-prettier
import prettierFlat from 'eslint-config-prettier/flat';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  // 1) Ignore generated stuff
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
  },

  // 2) Bring in Next's rules (React, hooks, a11y, etc.)
  ...compat.config({ extends: ['next'] }),

  // 3) Your project rules for TS files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-restricted-imports': ['warn', { patterns: ['../*'] }],
    },
  },

  // 4) Turn off stylistic rules that conflict with Prettier (must be LAST)
  prettierFlat,
];

export default config;
