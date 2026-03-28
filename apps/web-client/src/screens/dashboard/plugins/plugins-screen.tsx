import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H5, P } from "@/components/ui/typography";
import { ICONS_ENUM, PLUGINS_INFO } from "@rtqs/plugin-loader";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePluginThemeProvider } from "@/providers/plugin-theme-provider";

const __PLUGINS = Object.values(PLUGINS_INFO);

export function PluginsScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { setPlugins, plugins } = usePluginThemeProvider();
  const filteredPlugin = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return __PLUGINS;
    return __PLUGINS.filter(
      (plugin) =>
        plugin.name.toLowerCase().includes(q) ||
        plugin.description.toLowerCase().includes(q),
    );
  }, [debouncedSearch]);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex items-center justify-between">
        <H5>All available plugins in this application.</H5>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-52"
          placeholder="Search plugins"
          beforeContent={<Icon name={ICONS_ENUM.SEARCH} />}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlugin.map((plugin) => (
          <Card key={plugin.name} size="default">
            <CardHeader className="pb-2">
              <div className="flex gap-4 items-center">
                <Avatar className="rounded-md">
                  <AvatarImage
                    className="object-contain! p-1"
                    src={"/icons/plugin.svg"}
                  />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 flex-1">
                  <CardTitle className="truncate text-base font-medium capitalize">
                    {plugin.name
                      .replace(/^@rtqs\/plugin-/, "")
                      .replace(/-/g, " ")}
                  </CardTitle>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {plugin.type}
                  </Badge>
                  <Button
                    onClick={() => setPlugins(() => [plugin.name])}
                    variant={"outline"}
                    size={"sm"}
                    className="text-xs h-6 ml-auto"
                    disabled={plugins.includes(plugin.name)}
                  >
                    {plugins.includes(plugin.name) ? "Activated" : "Activate"}
                  </Button>
                </div>
              </div>
              <CardDescription className="font-mono text-xs mt-1">
                {plugin.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
