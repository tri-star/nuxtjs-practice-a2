/// <reference types="vite/client" />

interface ImportMetaEnv {
  USE_API_STUB: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
