import { createContext, useState } from "react";

type theme = "dark" | "";

interface AppContextProps {
  theme?: theme,
  switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({});

type ThemeProviderProps = {
  children: React.ReactNode;
}

export function AppProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useState<theme>("dark");

  function switchTheme() { setTheme(theme === "" ? "dark" : "") };

  return (
    <AppContext.Provider value={{ theme, switchTheme }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext;