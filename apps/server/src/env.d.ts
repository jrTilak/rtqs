import { EnvConfig } from "@/common/validations/env.validation";

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvConfig { }
  }
}

export { };
