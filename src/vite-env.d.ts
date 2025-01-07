/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_KEY: string;
  readonly VITE_PIMLICO_KEY: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_MAGIC_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
