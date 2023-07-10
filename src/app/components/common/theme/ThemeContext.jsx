import PropTypes from "prop-types";
import { createContext, useState, useCallback, useEffect } from "react";
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";
import themeConfig from "../../../utils/data/themeConfig";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(() =>
    JSON.parse(localStorage.getItem("darkTheme"))
  );

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  const handleToggleTheme = useCallback(() => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }, []);

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
