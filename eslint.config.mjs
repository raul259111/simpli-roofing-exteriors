import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unescaped entities rule for apostrophes
      "react/no-unescaped-entities": "off",
      // Disable strict any type checking
      "@typescript-eslint/no-explicit-any": "off",
      // Disable unused vars that are intentionally unused
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      // Allow prefer-rest-params
      "prefer-rest-params": "off",
      // Relax exhaustive deps for useEffect
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];

export default eslintConfig;
