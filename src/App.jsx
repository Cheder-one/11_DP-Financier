import { Route, Switch } from "react-router-dom";
import NavBar from "./app/components/ui/navBar/navBar";
import WelcomePage from "./app/components/page/welcomePage";
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";
import Footer from "./app/components/ui/footer";

const App = () => {
  enableDarkMode({
    brightness: 100,
    contrast: 110,
    sepia: 0
  });

  disableDarkMode();

  return (
    <>
      <NavBar />
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
