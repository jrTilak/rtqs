import { version, name } from "../../package.json";

export const APP_CONFIG = (() => {
  const [core, pre] = version.split("-");

  let prerelease: string | undefined;
  let iteration: number | undefined;

  if (pre) {
    const [tag, iter] = pre.split(".");
    prerelease = tag;
    iteration = iter ? Number(iter) : undefined;
  }

  return {
    name,
    version: core,
    releaseChannel: prerelease,
    iteration,
  };
})();
