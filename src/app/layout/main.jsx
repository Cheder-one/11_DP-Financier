import PropTypes from "prop-types";
import axios from "axios";
import MainPage from "../components/page/mainPage";
import { useEffect } from "react";

const Main = ({ userId }) => {
  useEffect(() => {
    axios.get(`api/users/${userId}`).then((response) => {
      console.log(response.data);
    });

    axios.get(`/api/accounts/${userId}`).then((response) => {
      console.log(response.data);
    });
  }, [userId]);

  return <MainPage userId={userId} />;
};

Main.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Main;
