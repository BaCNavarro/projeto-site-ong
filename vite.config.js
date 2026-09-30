import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { minify } from 'html-minifier-terser';

const minifyHtml = () => ({
  name: 'minify-html',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: (html) => minify(html, { collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true }),
  },
});

export default defineConfig({
  base: './',
  plugins: [minifyHtml()],
  build: {
    outDir: 'dist',
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projetos: resolve(__dirname, 'projetos.html'),
        cadastro: resolve(__dirname, 'cadastro.html'),
      },
    },
  },
});
