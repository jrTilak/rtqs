import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { useCircularTransition } from "@/hooks/use-circular-transition";
import { useEffect, useState } from "react";
import { Icon } from "../icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";

interface ModeToggleProps {
  variant?: "outline" | "ghost" | "default";
}

export function ThemeModeToggle({ variant = "outline" }: ModeToggleProps) {
  const { theme } = useTheme();
  const { toggleTheme } = useCircularTransition();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      if (theme === "dark") {
        setIsDarkMode(true);
      } else if (theme === "light") {
        setIsDarkMode(false);
      } else {
        setIsDarkMode(
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        );
      }
    };

    updateMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateMode);

    return () => mediaQuery.removeEventListener("change", updateMode);
  }, [theme]);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(event);
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleToggle}
      className="cursor-pointer mode-toggle-button relative overflow-hidden"
    >
      {isDarkMode ? (
        <Icon
          name={ICONS_ENUM.LIGHT_MODE}
          className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 rotate-0 scale-100"
        />
      ) : (
        <Icon
          name={ICONS_ENUM.DARK_MODE}
          className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 rotate-0 scale-100"
        />
      )}
      <span className="sr-only">
        Switch to {isDarkMode ? "light" : "dark"} mode
      </span>
    </Button>
  );
}
