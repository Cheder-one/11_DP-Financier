import { Route, Switch } from "react-router-dom";
import NavBar from "./app/components/ui/navbar/navBar";
import Footer from "./app/components/ui/footer";
import { Welcome, Main } from "./app/layout";
import { StickyFooter, Divider } from "./app/components/common/typography";
import { ThemeProvider } from "./app/components/common/theme/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <NavBar />
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
    </ThemeProvider>
  );
};

export default App;
