/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_RPC_MAINNET: string;
  readonly VITE_APP_IS_ALLOW_CACHED: string;
  readonly VITE_APP_REFRESH_AFTER_MINS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
