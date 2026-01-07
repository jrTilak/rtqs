interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SERVER_URL: string;
  readonly VITE_PUBLIC_APP_NAME: string;
  readonly VITE_PUBLIC_APP_DESC: string;
  readonly VITE_PUBLIC_APP_LOGO_URL: string;
  readonly VITE_PUBLIC_APP_BANNER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
