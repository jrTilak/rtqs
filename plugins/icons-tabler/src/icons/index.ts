import {
  ICONS_ENUM,
  type IconsPluginExportsSchemaType,
} from "@rtqs/plugin-loader";

export const ICONS: IconsPluginExportsSchemaType = {
  [ICONS_ENUM.ANONYMOUS_AVATAR]: async () =>
    (await import("@tabler/icons-react")).IconBrandRedhat,
  [ICONS_ENUM.GOOGLE]: async () =>
    (await import("@tabler/icons-react")).IconBrandGoogleFilled,
  [ICONS_ENUM.LOGIN_LINK]: async () =>
    (await import("@tabler/icons-react")).IconMailBolt,
  [ICONS_ENUM.SPINNER]: async () =>
    (await import("@tabler/icons-react")).IconLoader3,
};
