import PropTypes from "prop-types";
import MainPage from "../components/page/2_mainPage";

const Main = ({ userId }) => {
  return <MainPage userId={userId} />;
};

Main.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Main;
