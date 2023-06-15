import { Route, Switch } from "react-router-dom";
import NavBar from "./app/components/ui/navBar/navBar";
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";
import Footer from "./app/components/ui/footer";
import { useEffect, useState } from "react";
import themeConfig from "./app/utils/data/themeConfig";
import Welcome from "./app/layout/welcome";
import Login from "./app/layout/login";

const App = () => {
  const isDarkThemeEnabled = JSON.parse(localStorage.getItem("darkTheme"));

  const [darkTheme, setDarkTheme] = useState(isDarkThemeEnabled);

  const handleToggleTheme = () => {
    const newDarkThemeValue = !darkTheme;
    setDarkTheme(newDarkThemeValue);
    localStorage.setItem("darkTheme", JSON.stringify(newDarkThemeValue));
  };

  useEffect(() => {
    isDarkThemeEnabled ? enableDarkMode(themeConfig) : disableDarkMode();
  }, [isDarkThemeEnabled]);

  return (
    <>
      <NavBar onToggleTheme={handleToggleTheme} darkTheme={darkTheme} />
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Switch>
            <Route path="/login/:type?" component={Login} />
            <Route path="/profile" />
            <Route path="/settings" />
            <Route path="/history" />
            <Route path="/analysis" />
            <Route path="/main" />
            <Route path="/" component={Welcome} />
          </Switch>
        </div>
        <Route path="/" component={Footer} />
      </div>
    </>
  );
};

export default App;