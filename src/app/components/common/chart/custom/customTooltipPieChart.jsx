import PropTypes from "prop-types";
import numeral from "numeral";

const CustomTooltipPieChart = ({
  active,
  payload,
  negativeValue
}) => {
  if (active && payload && payload.length) {
    const sign = negativeValue ? "-" : "";

    return (
      <div className="border rounded bg-white px-2 pt-2">
        {payload.map(({ payload }) => {
          const value = numeral(payload.value).format("0,0");

          return (
            <p
              key={payload.name}
              className="intro"
              style={{ color: payload.fill }}
            >
              {`${payload.name} : ${sign}${value} ₽`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

CustomTooltipPieChart.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  negativeValue: PropTypes.bool
};

export default CustomTooltipPieChart;
