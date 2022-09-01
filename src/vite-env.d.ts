/// <reference types="vite/client" />
declare module '*.css';
declare module '*.jpg';
declare module '*.module.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
