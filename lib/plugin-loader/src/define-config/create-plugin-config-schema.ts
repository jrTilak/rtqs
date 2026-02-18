import z from "zod";

export const createPluginConfigSchema = <T extends z.ZodType, P extends string>(
  pluginType: P,
  exports: T,
) => {
  return z.object({
    name: z
      .string({ error: "Please provide a valid plugin name" })
      .nonempty({ error: "Please provide a valid plugin name" }),
    description: z.string().optional(),
    config: z.object({
      type: z.literal(pluginType),
      exports: exports,
    }),
    /**
     * The version of the plugin.
     */
    version: z.string().nonempty(),

    /**
     * The target version of the application that this plugin is compatible with.
     */
    targetVersion: z.string().nonempty(),

    status: z.enum(["stable", "beta", "deprecated"]),
  });
};
