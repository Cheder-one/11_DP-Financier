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

const CURRENCIES = [
  { id: 1, name: "Российский Рубль (RUB)" },
  { id: 2, name: "Доллар США (USD)" },
  { id: 3, name: "Евро (EUR)" },
  { id: 4, name: "Британский Фунт (GBP)" },
  { id: 5, name: "Японская Йена (JPY)" },
  { id: 6, name: "Швейцарский Франк (CHF)" },
  { id: 7, name: "Канадский Доллар (CAD)" },
  { id: 8, name: "Австралийский Доллар (AUD)" },
  { id: 9, name: "Китайский Юань (CNY)" },
  { id: 10, name: "Индийская Рупия (INR)" }
];

const CreateAccountForm = () => {
  const [inputFields, setInputFields] = useState({
    account: {},
    name: "",
    icon: "VscBlank",
    iconColor: "#00000",
    currency: {},
    sum: "",
    comment: ""
  });

  console.log(inputFields);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="flex gap-3">
        <Dropdown
          name={"account"}
          defaultValue={"Тип счета"}
          value={inputFields.account.name}
          items={ITEMS}
          onChange={handleInputChange}
        />
        <Dropdown
          name={"currency"}
          defaultValue={"Валюта счета"}
          value={inputFields.currency.name}
          items={CURRENCIES}
          onChange={handleInputChange}
        />
      </div>

      <Row className="flex items-end mt-3 mt-md-1">
        <Col md={1}>
          <Row className="h-7">
            <Col>
              <IconPicker
                drop={"down"}
                name={"icon"}
                value={inputFields.icon}
                color={inputFields.iconColor}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="pt-1">
            <Col>
              <ColorPicker
                drop={"down"}
                name={"iconColor"}
                value={inputFields.iconColor}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        </Col>
        <Col md={11} className="ps-md-0">
          <TextField
            className={"mt-3 ms-0 ms-md-1"}
            label={"Название счета"}
            name={"name"}
            value={inputFields.name}
            floating={true}
            onChange={handleInputChange}
            // error={errors.name}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateAccountForm;
