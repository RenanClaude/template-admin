import { createContext, useEffect, useState } from "react";

type theme = "dark" | "";

interface AppContextProps {
  theme?: string,
  switchTheme?: () => void
}

const AppContext = createContext<AppContextProps>({});

type ThemeProviderProps = {
  children: React.ReactNode;
}

export function AppProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useState("dark");

  function switchTheme() {
    const newTheme = theme === "" ? "dark" : "";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme)
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme!);
  }, [])

  return (
    <AppContext.Provider value={{ theme, switchTheme }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext;