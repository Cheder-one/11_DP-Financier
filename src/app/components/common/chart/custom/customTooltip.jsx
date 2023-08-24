import PropTypes from "prop-types";
import numeral from "numeral";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border rounded bg-white px-2 pt-2">
        <p className="label">{`${label}`}</p>
        {payload.map((data) => {
          const categoryColor =
            data.dataKey === "avg" ? data.stroke : data.fill;
          const amount = numeral(data.value).format("0,0");

          return (
            <p
              key={data.dataKey}
              className="intro"
              style={{ color: categoryColor }}
            >
              {`${data.name} : ${amount} ₽`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
};

export default CustomTooltip;
