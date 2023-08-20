import PropTypes from "prop-types";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect
} from "react";
import { keys, some } from "lodash";
import { Col, Row } from "react-bootstrap";

import {
  TextField,
  IconPicker,
  ColorPicker,
  DropdownComponent
} from "../../../common/form";
import {
  genNanoId,
  createNewAccount,
  updateInputFields,
  validationSchema,
  postUserAccount,
  postUserEntity,
  checkIsNewNameUniq
} from "../../../../utils";
import { useFormValidation } from "../../../../hooks";
import userPropTypes from "../../../../types/userPropTypes";

const { accountSchema } = validationSchema;

const AccountCreationForm = forwardRef(({ user, onSuccess }, ref) => {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [inputFields, setInputFields] = useState({
    name: "",
    entity: { id: "", name: "" },
    currency: { id: "", name: "", symbol: "" },
    iconName: "VscBlank",
    iconColor: "#00000",
    balance: "",
    comment: ""
  });
  const { entity } = inputFields;

  const handleInputChange = ({ target }) => {
    updateInputFields(target, setInputFields);
  };

  const handleAddNewEntity = ({ target }) => {
    const { name, value } = target;
    const newEntity = { id: "isNew", name: value };

    setInputFields((prev) => ({
      ...prev,
      [name]: newEntity
    }));
  };

  const checkIsAccountNameUniq = () => {
    return !some(user.accounts, { name: inputFields.name });
  };
  const checkIsEntityNameUniq = () => {
    return checkIsNewNameUniq(entity, user.entities);
  };

  const isAccountNameUniq = checkIsAccountNameUniq();
  const isEntityNameUniq = checkIsEntityNameUniq();

  useEffect(() => {
    checkIsAccountNameUniq();
    checkIsEntityNameUniq();
    // eslint-disable-next-line
  }, [entity]);

  const errors = useFormValidation(
    inputFields,
    accountSchema(isAccountNameUniq, isEntityNameUniq)
  );
  const hasErrors = keys(errors).length;

  const generateNewIds = () => {
    const newAccountId = `account-id-${genNanoId()}`;
    const newEntityId = `entity-id-${genNanoId()}`;
    return { newAccountId, newEntityId };
  };

  const postDataToUser = () => {
    const { newAccountId, newEntityId } = generateNewIds();

    const newAccount = createNewAccount({
      ...inputFields,
      newAccountId
    });

    if (entity.id === "isNew") {
      newAccount.entity = newEntityId;

      const newEntity = { id: newEntityId, name: entity.name };
      postUserEntity(user.id, newEntity);
    }

    postUserAccount(user.id, newAccount);
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
      <Row className="mb-4 mt-3">
        <Col className="flex gap-3">
          <DropdownComponent
            name={"entity"}
            items={user.entities}
            defaultValue={"Тип счета"}
            value={inputFields.entity.name}
            placeholder={"Введите тип счета"}
            isAdditionEnabled={true}
            touched={isSubmitClicked}
            onSelect={handleInputChange}
            onElemAdding={handleAddNewEntity}
            error={errors.entity}
          />
          <DropdownComponent
            name={"currency"}
            items={user.currencies}
            defaultValue={"Валюта счета"}
            value={inputFields.currency.symbol}
            touched={isSubmitClicked}
            onSelect={handleInputChange}
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
    </>
  );
});

AccountCreationForm.displayName = AccountCreationForm;

AccountCreationForm.propTypes = {
  user: userPropTypes,
  onSuccess: PropTypes.func.isRequired
};

export default AccountCreationForm;
