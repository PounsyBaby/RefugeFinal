/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
  readonly MAIN_WINDOW_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_NAME: string;
