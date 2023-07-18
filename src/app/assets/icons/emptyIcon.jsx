const EmptyIcon = ({ height, width }) => {
  return (
    <div className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        // color={color}
      >
        {/* {color ? <rect width="100%" height="100%" fill={color} /> : ""} */}
      </svg>
    </div>
  );
};

EmptyIcon.defaultProps = {
  height: "20px",
  width: "20px"
};

export default EmptyIcon;
