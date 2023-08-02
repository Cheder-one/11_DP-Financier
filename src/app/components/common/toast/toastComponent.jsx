import PropTypes from "prop-types";
import { MdDone } from "react-icons/md";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = ({ text, type, icon, theme }) => {
  // Прежде чем заниматься этим, я должен реализовать основной функционал

  const getThemeByIsDarkTheme = (params) => {
    return null;
  };

  const showToast = () => {
    toast(text, {
      position: "bottom-right",
      transition: Slide,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme,
      type,
      icon
    });
  };

  return (
    <>
      <button onClick={showToast}>Показать тост</button>
      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

ToastComponent.defaultProps = {
  text: "Операция успешна",
  type: "success",
  icon: <MdDone size={20} className="text-green-400" />,
  theme: "light"
};

ToastComponent.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  theme: PropTypes.string
};

export default ToastComponent;
