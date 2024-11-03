import React from "react";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";

function func() {}

const DarkModeContext = React.createContext<DarkModeContextType>({
  colorTheme: "light",
  toggleColorTheme: func,
});

/**
 *
 * @param children The layout child
 * @returns
 */
function DarkModeProvider({ children }: { children: JSX.Element }) {
  const colorScheme = useColorScheme();

  const [colorTheme, setColorTheme] = useLocalStorage<ColorThemeOption>({
    key: "color-theme",
    defaultValue: colorScheme,
  });

  const toggleColorTheme = () => {
    const newColorTheme = colorTheme === "light" ? "dark" : "light";
    setColorTheme(newColorTheme);
  };

  return (
    <DarkModeContext.Provider value={{ colorTheme, toggleColorTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
