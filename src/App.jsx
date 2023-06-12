import { Route, Switch } from "react-router-dom";
import NavBar from "./app/components/ui/navBar/navBar";
import WelcomePage from "./app/components/page/welcomePage";
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";
import Footer from "./app/components/ui/footer";
import { useEffect, useState } from "react";
import themeConfig from "./app/utils/data/themeConfig";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  console.log({ darkTheme });

  const handleToggleTheme = (e) => {
    const { checked } = e.target;
    setDarkTheme(checked);
    e.stopPropagation();
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
      <NavBar onToggleTheme={handleToggleTheme} />
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Switch>
            <Route path="/profile" />
            <Route path="/settings" />
            <Route path="/history" />
            <Route path="/analysis" />
            <Route path="/main" />
            <Route path="/" component={WelcomePage} />
          </Switch>
        </div>
        <Route path="/" component={Footer} />
      </div>
    </>
  );
};

export default App;
