import { Route, Switch } from "react-router-dom";
import NavBar from "./app/components/ui/navBar/navBar";
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";
import Footer from "./app/components/ui/footer";
import { useCallback, useEffect, useState } from "react";
import themeConfig from "./app/utils/data/themeConfig";
import Welcome from "./app/layout/welcome";
import StickyFooter from "./app/components/common/typography/stickyFooter";
import Main from "./app/layout/main";
import Divider from "./app/components/common/typography/divider";

const App = () => {
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
    <>
      <NavBar onToggleTheme={handleToggleTheme} darkTheme={darkTheme} />
      <Divider />
      <StickyFooter
        body={
          <Switch>
            <Route path="/profile" />
            <Route path="/settings" />
            <Route path="/history" />
            <Route path="/analysis" />
            <Route
              path="/main"
              render={(props) => <Main {...props} userId="user-id-1" />}
            />
            <Route path="/" component={Welcome} />
          </Switch>
        }
        footer={<Route path="/" component={Footer} />}
      />
    </>
  );
};

export default App;
