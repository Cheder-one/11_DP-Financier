import { useState, forwardRef, useImperativeHandle } from "react";
import { keys } from "lodash";
import { Col, Form, Row } from "react-bootstrap";

import { DropdownComponent } from "../../../common/form";
import TextField from "../../../common/form/input-field/textField";
import { IconPicker, ColorPicker } from "../../../common/pickers";
import {
  dataConstants,
  updateInputFields,
  validationSchema
} from "../../../../utils";
import { useFormValidation } from "../../../../hooks";

const { accountSchema } = validationSchema;
const { ACCOUNT_TYPES, CURRENCIES } = dataConstants;

const AccountCreationForm = forwardRef((props, ref) => {
  const [inputFields, setInputFields] = useState({
    account: {},
    currency: {},
    name: "",
    icon: "VscBlank",
    iconColor: "#00000",
    balance: "",
    comment: ""
  });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const errors = useFormValidation(inputFields, accountSchema);
  const hasErrors = keys(errors).length;

  const handleInputChange = ({ target }) => {
    updateInputFields(target, setInputFields);
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
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4 mt-3">
          <Col className="flex gap-3">
            <DropdownComponent
              name={"account"}
              items={ACCOUNT_TYPES}
              defaultValue={"Тип счета"}
              value={inputFields.account.name}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.account}
            />
            <DropdownComponent
              name={"currency"}
              items={CURRENCIES}
              defaultValue={"Валюта счета"}
              value={inputFields.currency.code}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.currency}
            />
          </Col>
        </Row>

        <Row className="">
          <Col md={1} className="md:grid mb-md-0 gap-1 | mb-3 flex">
            <Row>
              <IconPicker
                name={"icon"}
                value={inputFields.icon}
                color={inputFields.iconColor}
                onChange={handleInputChange}
              />
            </Row>
            <Row>
              <ColorPicker
                name={"iconColor"}
                value={inputFields.iconColor}
                onChange={handleInputChange}
              />
            </Row>
          </Col>

          <Col md={11}>
            <Row className="d-md-flex gap-md-0 | grid gap-3">
              <Col md={7} className="md:pl-0.5">
                <TextField
                  containerClass={"mb-0"}
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
                  containerClass={"mb-0"}
                  label={"Баланс"}
                  name={"balance"}
                  value={inputFields.balance}
                  floating={true}
                  isSubmit={isSubmitClicked}
                  onChange={handleInputChange}
                  error={errors.balance}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <TextField
          containerClass={"mt-3"}
          label={"Комментарий"}
          name={"comment"}
          value={inputFields.comment}
          floating={true}
          textaria={true}
          isSubmit={isSubmitClicked}
          onChange={handleInputChange}
        />
      </Form>
    </>
  );
});

AccountCreationForm.displayName = AccountCreationForm;

export default AccountCreationForm;
