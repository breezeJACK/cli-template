/// <reference types="vitest" />

import { ConfigEnv, UserConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import WindiCSS from 'vite-plugin-windicss';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import visualizer from 'rollup-plugin-visualizer';
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';
import Inspect from 'vite-plugin-inspect';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import { resolve } from 'path';
import { generateModifyVars } from './src/styles/antd-variables';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const { VITE_APP_BASE_URL } = loadEnv(mode, root);
  return {
    envDir: './env',
    plugins: [
      vue(),
      vueJsx({}),
      WindiCSS(),
      legacy({}),
      visualizer(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__'
      }),
      // 自动导入 import xx from xx
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: 'types/auto-imports.d.ts'
      }),
      Components({
        dirs: ['src/components'],

        // resolvers: [ElementPlusResolver()],
        extensions: ['vue'],
        // 配置文件生成位置
        dts: 'types/components.d.ts',
        resolvers: [
          AntDesignVueResolver({
            importLess: true
          })
        ]
      }),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()]
      }),
      Inspect(),
      PkgConfig(),
      OptimizationPersist()
    ],
    server: {
      port: 7000,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'https://wwwbaidu.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: resolve(__dirname, './src') }
      ]
    },
    css: {
      // modules: {
      //   generateScopedName: '[local]__[hash:base64:5]'
      // },
      preprocessorOptions: {
        less: {
          // 重写 less 变量，定制样式,
          modifyVars: generateModifyVars(),
          // 支持内联 JavaScript，支持 less 内联 JS
          javascriptEnabled: true
        }
      }
    },
    build: {
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    test: {
      environment: 'jsdom'
    }
  };
};
