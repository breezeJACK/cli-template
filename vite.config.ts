import { ConfigEnv, UserConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
import visualizer from 'rollup-plugin-visualizer';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import Inspect from 'vite-plugin-inspect';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import antdDayjs from 'antd-dayjs-vite-plugin';
import antdTheme from './src/styles/antd-variables';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const { VITE_APP_BASE_URL } = loadEnv(mode, root);
  return {
    envDir: './env',
    plugins: [
      react(),
      WindiCSS(),
      legacy({}),
      antdDayjs(),
      // visualizer(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__'
      }),
      createStyleImportPlugin({
        resolves: [AntdResolve()]
      }),
      Inspect(),
      PkgConfig(),
      OptimizationPersist()
    ],
    server: {
      port: 2048,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'https://api.github.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api')
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
      modules: {
        generateScopedName: '[local]__[hash:base64:5]'
      },
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript，支持 less 内联 JS
          javascriptEnabled: true,
          // 重写 less 变量，定制样式
          modifyVars: antdTheme
        }
      }
    },
    build: {
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          manualChunks: {
            // 分包
            vendor: ['react', 'react-dom', 'axios', 'react-router-dom', 'dayjs'],
            antd: ['antd']
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  };
};
