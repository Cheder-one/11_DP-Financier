import PropTypes from "prop-types";

const ChartLegend = ({ data, containerClass }) => {
  const getContainerClass = () => {
    return (
      containerClass + " gap-1 flex flex-wrap justify-center pb-3"
    );
  };

  return (
    <div className={getContainerClass()}>
      {data.map((item) => (
        <div key={item.name} className="flex items-center mx-1">
          <div
            className="w-4 h-2.5"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm pl-1">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

ChartLegend.propTypes = {
  data: PropTypes.array.isRequired,
  containerClass: PropTypes.string
};

export default ChartLegend;
