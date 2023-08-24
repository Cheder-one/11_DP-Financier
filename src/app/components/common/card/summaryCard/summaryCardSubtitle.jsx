import numeral from "numeral";
import PropTypes from "prop-types";

const SummaryCardSubtitle = ({ value, text, type }) => {
  const getSubtitleClass = () => {
    return (
      "font-space-mono font-bold text-lg " +
      (type === "income"
        ? "text-emerald-400"
        : type === "expense"
        ? "text-rose-400"
        : "text-green-500")
    );
  };

  return (
    <div className="flex items-center">
      {text && (
        <span className="pr-2 pb-0.5 font-light text-md">{text}</span>
      )}
      <span className={getSubtitleClass()}>
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
