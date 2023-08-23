import PropTypes from "prop-types";
import QuotesTab from "./quotesTab";

const QuotesTabComponent = ({ chunkedData, title, md }) => {
  return (
    <div className="flex gap-3 px-3 pb-3">
      {chunkedData.map((item, i) => (
        <div key={i} className="w-full">
          <QuotesTab md={md} title={title} bodyItems={item} />
        </div>
      ))}
    </div>
  );
};

QuotesTabComponent.propTypes = {
  chunkedData: PropTypes.array.isRequired,
  title: PropTypes.object,
  md: PropTypes.array
};

export default QuotesTabComponent;
