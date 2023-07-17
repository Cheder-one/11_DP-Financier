import Dropdown from "../../common/form/dropdown";
import { useState } from "react";
import TextField from "../../common/form/textField";
import IconPicker from "../../common/icon-picker/iconPicker";
import { Col, Row } from "react-bootstrap";

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
    currency: "",
    sum: "",
    comment: ""
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Dropdown
        label={"Тип счета"}
        name={"account"}
        value={inputFields.account.name}
        items={ITEMS}
        onChange={handleInputChange}
      />
      <Row className="flex items-end">
        <Col md={1}>
          <IconPicker className={"mt-3"} />
        </Col>
        <Col md={11}>
          <TextField
            className={"mt-3"}
            label={"Название счета"}
            name={"name"}
            value={inputFields.name}
            onChange={handleInputChange}
            // error={errors.name}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateAccountForm;
