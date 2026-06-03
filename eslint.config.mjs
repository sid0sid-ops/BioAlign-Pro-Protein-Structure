import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "src/generated/**",
      ".next/**",
      "docs/**",
      "dist/**",
      "out/**",
      "node_modules/**",
      "coverage/**",
      "public/models/**",
      "public/data/structures/**",
      "bio_tools/**"
    ]
  },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "@next/next/no-html-link-for-pages": "off",
      "jsx-a11y/role-supports-aria-props": "off"
    }
  }
];

export default eslintConfig;
