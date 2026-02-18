import { DEFAULT_ILLUSTRATION_PLUGIN } from "@/constants/plugins";
import { QUERY_KEYS } from "@/constants/query-keys";
import {
  getPluginConfig,
  type ILLUSTRATIONS_ENUM,
  IllustrationPluginSchema,
} from "@rtqs/plugin-loader";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps } from "react";

type Props = {
  name: ILLUSTRATIONS_ENUM;
} & ComponentProps<"svg">;

export const Illustration = ({ name, ...rest }: Props) => {
  // TODO: figure out a way to persist the loaded illustration components
  const result = useQuery({
    queryKey: QUERY_KEYS.plugins.illustration(DEFAULT_ILLUSTRATION_PLUGIN),
    queryFn: () =>
      getPluginConfig(IllustrationPluginSchema, DEFAULT_ILLUSTRATION_PLUGIN),
    meta: {
      persist: false,
    },
  });

  const comp = useQuery({
    queryKey: [
      QUERY_KEYS.plugins.illustrationComponent(
        DEFAULT_ILLUSTRATION_PLUGIN,
        name,
      ),
    ],
    queryFn: async () => {
      const plugin = result.data;
      if (!plugin) throw new Error("Illustration plugin not found");
      const comps = plugin.config.exports;
      const loader = comps[name];
      if (!loader) throw new Error(`Illustration ${name} not found in plugin`);
      const imported = (await loader()) as {
        default: React.ComponentType<ComponentProps<"svg">>;
      };
      if (!imported || !imported.default) {
        throw new Error(`Failed to load illustration component for ${name}`);
      }
      return imported.default;
    },
    enabled: result.isSuccess,
    meta: {
      persist: false,
    },
  });

  const Comp = comp.data;

  return Comp ? <Comp {...rest} /> : null;
};
