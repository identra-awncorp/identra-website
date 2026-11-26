/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the Identra API; defaults to https://api-identra.awncorp.vn (src/identra/config.ts). */
  readonly VITE_IDENTRA_API_URL?: string;
  /** CertNet gateway for the web trial wallet's second trust path; set with VITE_CERTNET_NETWORK or not at all (src/identra/config.ts). */
  readonly VITE_CERTNET_GATEWAY_URL?: string;
  /** `local`, `testnet` or `mainnet`; set with VITE_CERTNET_GATEWAY_URL or not at all. */
  readonly VITE_CERTNET_NETWORK?: string;
}

declare module 'virtual:identra-root-ca' {
  const rootCa: import('./identra/trust/rootCaPlugin').RootCaModule;
  export default rootCa;
}
