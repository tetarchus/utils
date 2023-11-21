import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
  clean: true,
  dts: true,
  entry: [
    'src/index.ts',
    'src/client/index.ts',
    'src/core/index.ts',
    'src/remix/index.ts',
    'src/server/index.ts',
    'src/typeguards/index.ts',
  ],
  format: ['cjs', 'esm'],
  minify: false,
  shims: true,
  splitting: true,
  sourcemap: true,
});

export default tsupConfig;
