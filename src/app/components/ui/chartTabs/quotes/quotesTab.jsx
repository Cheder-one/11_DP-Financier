import PropTypes from "prop-types";
import { TableCard } from "../../../common/card";

const QuotesTab = ({ md, title, bodyItems }) => {
  return <TableCard md={md} title={title} body={bodyItems} />;
};

QuotesTab.propTypes = {
  md: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.object,
  bodyItems: PropTypes.array.isRequired
};

export default QuotesTab;
