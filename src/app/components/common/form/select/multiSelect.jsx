import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";

const Multiselect = ({ selectClass }) => {
  return (
    <CreatableSelect
      isMulti
      options={[]}
      className={selectClass ? selectClass + " relative z-10" : "relative z-10"}
    />
  );
};

Multiselect.defaultProps = {
  // selectClass: "relative z-10"
};

Multiselect.propTypes = {
  selectClass: PropTypes.string
};

export default Multiselect;
