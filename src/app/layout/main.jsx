import PropTypes from "prop-types";
// import axios from "axios";
import MainPage from "../components/page/mainPage";
// import { useEffect, useState } from "react";

const Main = ({ userId }) => {
  return <MainPage userId={userId} />;
};

Main.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Main;
