import { useState } from "react";
import WelcomePage from "../components/page/welcomePage";
import Login from "./login";

const Welcome = () => {
  const [formType, setFormType] = useState("login");

  return (
    <>
      <WelcomePage />
      <Login {...{ formType, setFormType }} />
    </>
  );
};

export default Welcome;
