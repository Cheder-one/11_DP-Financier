import PropTypes from "prop-types";
import { useEffect, createContext } from "react";
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";

import { themeConfig } from "../../../utils";
import { useLocalStorage } from "../../../hooks";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useLocalStorage({
    darkTheme: false
  });

  const handleToggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  useEffect(() => {
    darkTheme ? enableDarkMode(themeConfig) : disableDarkMode();
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
