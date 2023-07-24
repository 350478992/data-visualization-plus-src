import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite';
// @ts-ignore
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': path.resolve(__dirname, '.', 'src'),
      '@c': path.resolve(__dirname, '.', 'node_modules/@data-visualization-plus/components/src'),
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
  }
});
