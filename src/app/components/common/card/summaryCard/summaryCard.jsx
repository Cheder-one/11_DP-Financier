import PropTypes from "prop-types";

const SummaryCard = ({ title, subtitle, children, parentRef }) => {
  return (
    <div className="border rounded h-80 w-1/3" ref={parentRef}>
      <div className="bg-gray-100 px-3 py-2 mb-3">
        <div className="flex justify-between pb-1">
          <div className="text-lg font-light">{title}</div>
          <button className="border rounded px-2">*</button>
        </div>
        {subtitle}
      </div>
      {children}
    </div>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  parentRef: PropTypes.func
};

export default SummaryCard;
