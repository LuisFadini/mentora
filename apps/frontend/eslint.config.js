import path from "node:path";

import js from "@eslint/js";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import svelte from "eslint-plugin-svelte";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import ts from "typescript-eslint";

import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  ".gitignore",
);

// eslint-disable-next-line no-restricted-exports
export default defineConfig(
  includeIgnoreFile(gitignorePath),

  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  svelte.configs.recommended,

  prettier,
  svelte.configs.prettier,

  {
    files: ["**/*.{js,ts,svelte,svelte.js,svelte.ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: "./tsconfig.lint.json",
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },

    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",

      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-require-imports": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
  {
    files: ["**/*.svelte"],
    rules: {
      "svelte/block-lang": ["error", { script: ["ts"], style: "postcss" }],
      "svelte/button-has-type": "error",
      "svelte/sort-attributes": "error",

      "svelte/no-at-const-tags": "error",
      "svelte/no-at-debug-tags": "error",

      "svelte/prefer-const": [
        "error",
        {
          destructuring: "any",
          additionalProperties: false,
        },
      ],
    },
  },
);
