import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { IconContext } from "react-icons";

import chunkedIconsArray from "../../../assets/icons/iconsImport";

const IconTable = ({ onItemSelect }) => {
  const handleItemSelect = (Icon) => {
    onItemSelect(Icon);
  };

  return (
    <Table bordered className="m-0">
      <tbody>
        {chunkedIconsArray(5).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((Icon, cellIndex) => (
              <td
                key={cellIndex}
                className="hover:bg-lime-200"
                onClick={() => handleItemSelect(Icon)}
              >
                <IconContext.Provider
                  value={{
                    size: "20px",
                    color: "black",
                    className: "cursor-pointer"
                  }}
                >
                  <Icon />
                </IconContext.Provider>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

IconTable.propTypes = {
  onItemSelect: PropTypes.func.isRequired
};

export default IconTable;
