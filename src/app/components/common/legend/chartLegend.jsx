import PropTypes from "prop-types";

const ChartLegend = ({ data, colors }) => {
  return (
    <div className="items-center mt-3">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center mr-4">
          <div
            className="w-2 h-4 ml-3"
            style={{ backgroundColor: colors[index] }}
          ></div>
          <span className="text-sm pl-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

ChartLegend.propTypes = {
  data: PropTypes.array.isRequired
  // colors: PropTypes.array.isRequired
};

export default ChartLegend;
