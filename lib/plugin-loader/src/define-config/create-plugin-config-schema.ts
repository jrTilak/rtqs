import z from "zod";

export const createPluginConfigSchema = <T extends z.ZodType, P extends string>(
  pluginType: P,
  exports: T,
) => {
  return z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    version: z.string().nonempty(),
    /**
     * The target version of the application that this plugin is compatible with.
     * @example "0.1" - compatible with version 0.1*
     * @example "0" - compatible with version 0*
     */
    targetVersion: z.string().nonempty(),

    // The scope of the plugin, indicating which part of the application it is intended for.
    scope: z.array(z.enum(["web-client", "server"])),

    type: z.literal(pluginType),

    /**
     * The actual exports usable by the application.
     */
    exports: exports,

    status: z.enum(["stable", "beta", "deprecated"]),
  });
};
