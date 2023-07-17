import PropTypes from "prop-types";
import { Dropdown, Form } from "react-bootstrap";

const DropdownComponent = ({
  label,
  name,
  value,
  items,
  className,
  onChange
}) => {
  const handleSelect = (eventKey) => {
    const selectedItem = JSON.parse(eventKey);

    onChange({
      target: {
        name,
        value: selectedItem
      }
    });
  };

  const defaultItem = items.length > 0 ? items[0].name : "";
  console.log(defaultItem);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Dropdown className={className} drop="down" onSelect={handleSelect}>
        <Dropdown.Toggle variant="light" className="border">
          {value || defaultItem}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item key={item.id} eventKey={JSON.stringify(item)}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};

DropdownComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DropdownComponent;
