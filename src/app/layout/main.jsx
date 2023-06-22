import axios from "axios";
import MainPage from "../components/page/mainPage";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Main = ({ userId }) => {
  useEffect(() => {
    axios.get(`api/users/${userId}`).then((response) => {
      console.log(response.data);
    });
  }, [userId]);

  return <MainPage userId={userId} />;
};

export default Main;
