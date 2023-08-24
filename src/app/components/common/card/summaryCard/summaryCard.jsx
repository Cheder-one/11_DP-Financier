import PropTypes from "prop-types";

const SummaryCard = ({ title, subtitle, children, parentRef }) => {
  return (
    <div
      className="w-full h-58vh mt-3 border rounded md:w-1/3 mt-md-0 overflow-y-auto"
      ref={parentRef}
    >
      <div className="bg-gray-100 px-3 py-2 mb-3">
        <div className="flex justify-between pb-1">
          <div className="text-lg font-light">{title}</div>
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
