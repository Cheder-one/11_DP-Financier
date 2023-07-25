import { useState, forwardRef, useImperativeHandle } from "react";
import { keys } from "lodash";
import { Col, Form, Row } from "react-bootstrap";

import { DropdownComponent } from "../../../common/form";
import TextField from "../../../common/form/input-field/textField";
import { IconPicker, ColorPicker } from "../../../common/pickers";
import { constantsData, validationSchema } from "../../../../utils";
import { useFormValidation } from "../../../../hooks";

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
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="flex gap-3">
            <DropdownComponent
              name={"account"}
              defaultValue={"Тип счета"}
              value={inputFields.account.name}
              items={ACCOUNT_TYPES}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.account}
            />
            <DropdownComponent
              name={"currency"}
              defaultValue={"Валюта счета"}
              value={inputFields.currency.code}
              items={CURRENCIES}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.currency}
            />
          </Col>
        </Row>

        <Row className="items-end pt-3">
          <Col md={1} className="grid gap-1">
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
            <Row className="flex items-end">
              <Col md={7}>
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
                  name={"sum"}
                  value={inputFields.sum}
                  floating={true}
                  isSubmit={isSubmitClicked}
                  onChange={handleInputChange}
                  error={errors.sum}
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
          onChange={handleInputChange}
        />
      </Form>
    </>
  );
});

AccountCreationForm.displayName = AccountCreationForm;

export default AccountCreationForm;
