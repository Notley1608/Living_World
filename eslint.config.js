import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// Module seams: imports point shared <- sim <- server, shared <- client,
// and other modules are reached only through their index (@shared, @sim).
const deepImports = {
  group: ['**/shared/*', '**/sim/*', '**/server/*', '**/client/*'],
  message: 'Import modules through their index (@shared, @sim), not their internals.',
};
const restrict = (...groups) => ({
  'no-restricted-imports': ['error', { patterns: [deepImports, ...groups] }],
});

export default tseslint.config(
  { ignores: ['dist/', 'node_modules/', 'public/', 'art/', 'data/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  { files: ['src/server/**', '*.config.*'], languageOptions: { globals: globals.node } },
  { files: ['src/client/**'], languageOptions: { globals: globals.browser } },
  {
    files: ['src/shared/**'],
    rules: restrict({
      group: ['@sim', '**/server/**', '**/client/**'],
      message: 'shared depends on nothing.',
    }),
  },
  {
    files: ['src/sim/**'],
    rules: restrict({
      group: ['node:*', 'express', 'ws', 'vue', 'pixi.js', '**/server/**', '**/client/**'],
      message: 'sim is pure: only @shared, no I/O or UI.',
    }),
  },
  {
    files: ['src/server/**'],
    rules: restrict({
      group: ['vue', 'pixi.js', '**/client/**'],
      message: 'server must not import client code.',
    }),
  },
  {
    files: ['src/client/**'],
    rules: restrict({
      group: ['@sim', 'express', 'ws', 'node:*', '**/server/**'],
      message: 'client talks to the server over the protocol in @shared only.',
    }),
  },
  prettier,
);
