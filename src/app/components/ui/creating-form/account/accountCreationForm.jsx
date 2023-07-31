import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";
import { keys } from "lodash";
import { Col, Form, Row } from "react-bootstrap";

import {
  TextField,
  IconPicker,
  ColorPicker,
  DropdownComponent
} from "../../../common/form";
import {
  getNanoId,
  dataConstants,
  createNewAccount,
  updateInputFields,
  validationSchema,
  postUserAccount
} from "../../../../utils";
import { useFormValidation } from "../../../../hooks";

const { accountSchema } = validationSchema;

const AccountCreationForm = forwardRef(({ user, onSuccess }, ref) => {
  const [inputFields, setInputFields] = useState({
    name: "",
    entity: {},
    currency: {},
    iconName: "VscBlank",
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

  console.log(inputFields);

  const postDataToUser = () => {
    const { name, entity, currency, comment, balance, iconName, iconColor } =
      inputFields;

    const newAccountId = `account-id-${getNanoId()}`;

    const dataToCreate = {
      ...inputFields,
      newAccountId
    };

    const newAccount = createNewAccount(dataToCreate);
    postUserAccount(user.id, newAccount);

    // const newTransaction = createNewAccount(dataToCreate);

    // if (category.id === "isNew") {
    //   newCategory.id = newCategoryId;
    //   newTransaction.category = newCategoryId;
    //   postUserCategory(user.id, newCategory);
    // }
    // postUserTransact(user.id, newTransaction);

    onSuccess();
  };

  const handleSubmit = () => {
    setIsSubmitClicked(true);

    if (hasErrors) {
      return undefined;
    } else {
      postDataToUser();
      return true;
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
              name={"entity"}
              items={user.entities}
              defaultValue={"Тип счета"}
              value={inputFields.entity.name}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.entity}
            />
            <DropdownComponent
              name={"currency"}
              items={user.currencies}
              defaultValue={"Валюта счета"}
              value={inputFields.currency.code}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.currency}
            />
          </Col>
        </Row>

        <Row>
          <Col md={1} className="mb-md-0 gap-1 d-md-block | mb-3 flex">
            <Row className="mb-md-1">
              <IconPicker
                name={"iconName"}
                value={inputFields.iconName}
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

AccountCreationForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  }).isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default AccountCreationForm;
