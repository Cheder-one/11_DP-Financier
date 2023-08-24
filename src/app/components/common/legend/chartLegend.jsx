import PropTypes from "prop-types";

const ChartLegend = ({ data }) => {
  return (
    <div className="items-center mt-2">
      {data.map((item) => (
        <div key={item.id} className="flex items-center mr-4">
          <div
            className="w-2 h-4 ml-3"
            style={{ backgroundColor: [item.color] }}
          ></div>
          <span className="text-sm pl-1">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

ChartLegend.propTypes = {
  data: PropTypes.array.isRequired
};

export default ChartLegend;
