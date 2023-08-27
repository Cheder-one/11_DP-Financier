import PropTypes from "prop-types";

const ChartEndLabel = ({ x, y, width, value }) => {
  const textStyle = {
    fill: "rgba(0, 128, 0, 0.6)",
    fontFamily: "Arial",
    fontSize: 14,
    fontWeight: "bold",
    textAnchor: "end"
  };

  return (
    <g>
      <text x={x + width - 10} y={y + 0} style={textStyle}>
        {value}
      </text>
    </g>
  );
};

export default ChartEndLabel;
