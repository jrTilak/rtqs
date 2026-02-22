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
  [ICONS_ENUM.CREATE_ORGANIZATION]: async () =>
    (await import("@tabler/icons-react")).IconLayoutGridAdd,
  [ICONS_ENUM.INVITE_USER]: async () =>
    (await import("@tabler/icons-react")).IconUserPlus,
  [ICONS_ENUM.ORGANIZATION]: async () =>
    (await import("@tabler/icons-react")).IconBuildingSkyscraper,
  [ICONS_ENUM.USERNAME]: async () =>
    (await import("@tabler/icons-react")).IconAt,
  [ICONS_ENUM.MAIL]: async () => (await import("@tabler/icons-react")).IconMail,
  [ICONS_ENUM.CHECK]: async () =>
    (await import("@tabler/icons-react")).IconCheck,
  [ICONS_ENUM.X]: async () => (await import("@tabler/icons-react")).IconX,
  [ICONS_ENUM.COPY]: async () =>
    (await import("@tabler/icons-react")).IconClipboardList,
};
