// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tagger()],
    build: {
      outDir: "build",
      sourcemap: command === 'serve',
      // Customize build based on environment
      minify: env.VITE_APP_ENV === 'production' ? 'esbuild' : false,
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@pages': path.resolve('./src/pages'),
        '@assets': path.resolve('./src/assets'),
        '@constants': path.resolve('./src/constants'),
        '@styles': path.resolve('./src/styles'),
        '@services': path.resolve('./src/services'),
      },
    },
    server: {
      port: "4028",
      host: "0.0.0.0",
      strictPort: true,
      allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
      open: true,
    }
  };
});
