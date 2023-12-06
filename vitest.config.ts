import { defineConfig } from 'vitest/config';
import { UserConfig } from 'vite';

// https://vitejs.dev/config/
const vitestConfig: UserConfig = {
  test: {
    globals: true,
    environment: 'node',
  },
};
export default defineConfig(vitestConfig);
