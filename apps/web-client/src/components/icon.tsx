import { DEFAULT_ICON_PLUGIN } from "@/constants/plugins";
import { QUERY_KEYS } from "@/constants/query-keys";
import {
  getPluginConfig,
  IconPluginSchema,
  ICONS_ENUM,
} from "@rtqs/plugin-loader";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps } from "react";

type Props = {
  name: ICONS_ENUM;
  defaultComponent?: React.ReactElement;
} & ComponentProps<"svg">;

export const Icon = ({ name, defaultComponent, ...rest }: Props) => {
  // TODO: figure out a way to persist the loaded icon components
  const result = useQuery({
    queryKey: QUERY_KEYS.plugins.icon(DEFAULT_ICON_PLUGIN),
    queryFn: () => getPluginConfig(IconPluginSchema, DEFAULT_ICON_PLUGIN),
    meta: {
      persist: false,
    },
  });

  const comp = useQuery({
    queryKey: [QUERY_KEYS.plugins.iconComponent(DEFAULT_ICON_PLUGIN, name)],
    queryFn: async () => {
      const plugin = result.data;
      if (!plugin) throw new Error("Icon plugin not found");
      const comps = plugin.exports;
      const loader = comps[name];
      console.log(
        `Loading icon component for ${name} from plugin ${DEFAULT_ICON_PLUGIN}`,
        { loader },
      );
      if (!loader) throw new Error(`Icon ${name} not found in plugin`);
      const imported = (await loader()) as React.ComponentType<
        ComponentProps<"svg">
      >;
      if (!imported) {
        throw new Error(`Failed to load icon component for ${name}`);
      }
      return imported;
    },
    enabled: result.isSuccess,
    meta: {
      persist: false,
    },
  });

  const Comp = comp.data;

  return Comp ? <Comp {...rest} /> : defaultComponent || <svg {...rest} />;
};
