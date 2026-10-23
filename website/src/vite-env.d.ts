/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLAY_STORE_URL?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_WAITLIST_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
