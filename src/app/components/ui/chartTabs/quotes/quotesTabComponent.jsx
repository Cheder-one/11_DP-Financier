import PropTypes from "prop-types";
import QuotesTab from "./quotesTab";

const QuotesTabComponent = ({ chunkedData, title, md }) => {
  return (
    <div className="md:flex md:gap-3 md:px-3 md:pb-3">
      {chunkedData.map((item, i) => (
        <div key={i} className="w-full mt-3 mt-md-0">
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
