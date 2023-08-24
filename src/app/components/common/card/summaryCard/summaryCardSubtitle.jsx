import numeral from "numeral";
import PropTypes from "prop-types";
import { getSubtitleClass } from "../../../../utils";

const SummaryCardSubtitle = ({ value, text, type }) => {
  return (
    <div className="flex items-center">
      {text && (
        <span className="pr-2 pb-0.5 font-light text-md">{text}</span>
      )}
      <span className={getSubtitleClass(type)}>
        {numeral(value).format("0,0_")}
        <span className="font-bold text-sm"> руб</span>
      </span>
    </div>
  );
};

SummaryCardSubtitle.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

export default SummaryCardSubtitle;
