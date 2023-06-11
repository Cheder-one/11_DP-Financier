import { Route, Switch } from "react-router-dom";
import NavBar from "./app/components/ui/navBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path={"/profile"} />
        <Route path={"/settings"} />
        <Route path={"/exit"} />
        <Route path={"/main"} />
        {/* <Route path={"/"} component={MainPage} /> */}
      </Switch>
    </>
  );
};

export default App;
