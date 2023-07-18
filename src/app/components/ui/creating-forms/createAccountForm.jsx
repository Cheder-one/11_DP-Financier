import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import Dropdown from "../../common/form/dropdown";
import TextField from "../../common/form/textField";
import IconPicker from "../../common/pickers/iconPicker";
import ColorPicker from "../../common/pickers/colorPicker";

const ITEMS = [
  { id: 1, name: "Наличные" },
  { id: 2, name: "Интернет деньги" },
  { id: 3, name: "Дебетовая карта" },
  { id: 4, name: "Кредитная карта" },
  { id: 5, name: "Депозит" },
  { id: 6, name: "Криптовалюта" },
  { id: 7, name: "Инвестиции" },
  { id: 8, name: "Имущество" },
  { id: 9, name: "Кредит" },
  { id: 10, name: "Долг" }
];

const CreateAccountForm = () => {
  const [inputFields, setInputFields] = useState({
    account: {},
    name: "",
    icon: { Icon: "", color: "" },
    currency: "",
    sum: "",
    comment: ""
  });

  // console.log(inputFields);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Dropdown
        name={"account"}
        defaultValue={"Тип счета"}
        value={inputFields.account.name}
        items={ITEMS}
        onChange={handleInputChange}
      />
      <Row className="flex items-end">
        <Col md={1}>
          <IconPicker className={""} drop={"down"} />
        </Col>
        <Col md={10}>
          <TextField
            className={"mt-3 ms-0 ms-md-1"}
            label={<span className="md:ml-[-2.7rem]">Название</span>}
            name={"name"}
            value={inputFields.name}
            onChange={handleInputChange}
            // error={errors.name}
          />
        </Col>
        <Col md={1}>
          <ColorPicker className={" "} drop={"down"} />
        </Col>
      </Row>
    </>
  );
};

export default CreateAccountForm;
