import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import Dropdown from "../../common/form/dropdown";
import TextField from "../../common/form/textField";
import IconPicker from "../../common/pickers/iconPicker";
import ColorPicker from "../../common/pickers/colorPicker";
import { accountSchema } from "../../../utils/validators/validationSchema";

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
  { id: 1, name: "Российский Рубль (RUB)", code: "RUB" },
  { id: 2, name: "Доллар США (USD)", code: "USD" },
  { id: 3, name: "Евро (EUR)", code: "EUR" },
  { id: 4, name: "Британский Фунт (GBP)", code: "GBP" },
  { id: 5, name: "Японская Йена (JPY)", code: "JPY" },
  { id: 6, name: "Швейцарский Франк (CHF)", code: "CHF" },
  { id: 7, name: "Канадский Доллар (CAD)", code: "CAD" },
  { id: 8, name: "Австралийский Доллар (AUD)", code: "AUD" },
  { id: 9, name: "Китайский Юань (CNY)", code: "CNY" },
  { id: 10, name: "Индийская Рупия (INR)", code: "INR" }
];

const CreateAccountForm = () => {
  const [inputFields, setInputFields] = useState({
    account: {},
    currency: {},
    name: "",
    icon: "VscBlank",
    iconColor: "#00000",
    sum: "",
    comment: ""
  });
  const [errors, setErrors] = useState({});

  console.log(errors);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    accountSchema
      .validate(inputFields, { abortEarly: false })
      .then(setErrors({}))
      .catch(({ inner }) => {
        const newErrors = {};
        for (const error of inner) {
          newErrors[error.path] = error.message;
        }
        setErrors(newErrors);
      });
  }, [inputFields]);

  return (
    <>
      <div className="flex gap-3">
        <Dropdown
          name={"account"}
          defaultValue={"Тип счета"}
          value={inputFields.account.name}
          items={ITEMS}
          onChange={handleInputChange}
          error={errors.account}
        />
        <Dropdown
          name={"currency"}
          defaultValue={"Валюта счета"}
          value={inputFields.currency.code}
          items={CURRENCIES}
          onChange={handleInputChange}
          error={errors.currency}
        />
      </div>

      <Row className="flex items-end mt-3 mt-md-0">
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
        <Col md={6} className="ps-md-0">
          <TextField
            className={"mt-3 ms-0 ms-md-1"}
            label={"Название счета"}
            name={"name"}
            value={inputFields.name}
            floating={true}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Col>
        <Col md={5}>
          <TextField
            className={"mt-3"}
            label={"Баланс"}
            name={"sum"}
            value={inputFields.sum}
            floating={true}
            onChange={handleInputChange}
            error={errors.sum}
          />
        </Col>
      </Row>
      <TextField
        className={"mt-3"}
        label={"Комментарий"}
        name={"comment"}
        value={inputFields.comment}
        floating={true}
        textaria={true}
        onChange={handleInputChange}
      />
    </>
  );
};

export default CreateAccountForm;
