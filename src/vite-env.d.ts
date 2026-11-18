/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the Identra API; defaults to https://api-identra.awncorp.vn (src/identra/config.ts). */
  readonly VITE_IDENTRA_API_URL?: string;
}

declare module 'virtual:identra-root-ca' {
  const rootCa: import('./identra/trust/rootCaPlugin').RootCaModule;
  export default rootCa;
}
