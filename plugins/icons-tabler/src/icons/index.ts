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
  [ICONS_ENUM.CHEVRON_UP_DOWN]: async () =>
    (await import("@tabler/icons-react")).IconSelector,
  [ICONS_ENUM.PLUS]: async () => (await import("@tabler/icons-react")).IconPlus,
  [ICONS_ENUM.LIGHT_MODE]: async () =>
    (await import("@tabler/icons-react")).IconSun,
  [ICONS_ENUM.DARK_MODE]: async () =>
    (await import("@tabler/icons-react")).IconMoon,
  [ICONS_ENUM.OPTIONS]: async () =>
    (await import("@tabler/icons-react")).IconDotsVertical,
  [ICONS_ENUM.LOG_OUT]: async () =>
    (await import("@tabler/icons-react")).IconLogout,
  [ICONS_ENUM.USER]: async () => (await import("@tabler/icons-react")).IconUser,
  [ICONS_ENUM.SETTINGS]: async () =>
    (await import("@tabler/icons-react")).IconSettings,
  [ICONS_ENUM.CHEVRON_RIGHT]: async () =>
    (await import("@tabler/icons-react")).IconChevronRight,
  [ICONS_ENUM.PLUGINS]: async () =>
    (await import("@tabler/icons-react")).IconPlugConnected,
  [ICONS_ENUM.SEARCH]: async () =>
    (await import("@tabler/icons-react")).IconSearch,
};
