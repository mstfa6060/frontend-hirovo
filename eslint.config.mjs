import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: ["lib/hirovo-api/**", "common/**"] },
  ...nextConfig,
];

export default eslintConfig;
