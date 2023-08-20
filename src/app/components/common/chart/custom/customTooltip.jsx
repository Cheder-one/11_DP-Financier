import PropTypes from "prop-types";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border rounded bg-white px-2 pt-2">
        <p className="label">{`Дата: ${label}`}</p>
        {payload.map((data) => {
          const categoryColor =
            data.dataKey === "avg" ? data.stroke : data.fill;

          return (
            <p
              key={data.dataKey}
              className="intro"
              style={{ color: categoryColor }}
            >
              {`${data.name} : ${data.value} ${data.unit}`}
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
