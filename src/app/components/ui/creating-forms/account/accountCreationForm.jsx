import { useState, forwardRef, useImperativeHandle } from "react";
import { keys } from "lodash";
import { Col, Form, Row } from "react-bootstrap";

import Dropdown from "../../../common/form/dropdown";
import TextField from "../../../common/form/textField";
import { IconPicker, ColorPicker } from "../../../common/pickers";
import { constantsData, validationSchema } from "../../../../utils";
import useFormValidation from "../../../../hooks/useFormValidation";

const { accountSchema } = validationSchema;
const { ACCOUNT_TYPES, CURRENCIES } = constantsData;

const AccountCreationForm = forwardRef((props, ref) => {
  const [inputFields, setInputFields] = useState({
    account: {},
    currency: {},
    name: "",
    icon: "VscBlank",
    iconColor: "#00000",
    sum: "",
    comment: ""
  });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const errors = useFormValidation(inputFields, accountSchema);
  const hasErrors = keys(errors).length;

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitClicked(true);

    if (hasErrors) {
      return undefined;
    } else {
      return inputFields;
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  return (
    <>
      <Form className="flex gap-3" onSubmit={handleSubmit}>
        <Dropdown
          name={"account"}
          defaultValue={"Тип счета"}
          value={inputFields.account.name}
          items={ACCOUNT_TYPES}
          isSubmit={isSubmitClicked}
          onChange={handleInputChange}
          error={errors.account}
        />
        <Dropdown
          name={"currency"}
          defaultValue={"Валюта счета"}
          value={inputFields.currency.code}
          items={CURRENCIES}
          isSubmit={isSubmitClicked}
          onChange={handleInputChange}
          error={errors.currency}
        />
      </Form>

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
            containerClass={"mt-3 ms-0 ms-md-1"}
            label={"Название счета"}
            name={"name"}
            value={inputFields.name}
            floating={true}
            isSubmit={isSubmitClicked}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Col>
        <Col md={5}>
          <TextField
            containerClass={"mt-3"}
            label={"Баланс"}
            name={"sum"}
            value={inputFields.sum}
            floating={true}
            isSubmit={isSubmitClicked}
            onChange={handleInputChange}
            error={errors.sum}
          />
        </Col>
      </Row>
      <TextField
        containerClass={"mt-3"}
        label={"Комментарий"}
        name={"comment"}
        value={inputFields.comment}
        floating={true}
        textaria={true}
        onChange={handleInputChange}
      />
    </>
  );
});

AccountCreationForm.displayName = AccountCreationForm;

export default AccountCreationForm;
