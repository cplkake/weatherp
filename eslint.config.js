import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";
import path from "path";
import nextPlugin from "@next/eslint-plugin-next";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["*.js"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
    },
  },
];
