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

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleToggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    if (darkTheme) {
      enableDarkMode(themeConfig);
    } else {
      disableDarkMode();
    }
  }, [darkTheme]);

  return (
    <>
      <NavBar onToggleTheme={handleToggleTheme} darkTheme={darkTheme} />
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Switch>
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
