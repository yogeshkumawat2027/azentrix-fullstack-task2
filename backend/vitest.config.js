import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,                   // we can use describe, it, expect without import
    setupFiles: ["./tests/setup.js"],
    testTimeout: 30000,      // max time of test execution
  },
});