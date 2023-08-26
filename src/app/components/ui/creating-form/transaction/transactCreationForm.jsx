import { keys } from "lodash";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import { BiSolidCalculator } from "react-icons/bi";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect
} from "react";

import {
  DropdownComponent,
  DropdownSheet,
  DatePicker,
  TextField
} from "../../../common/form";
import {
  genNanoId,
  validationSchema,
  updateInputFields,
  postUserCategory,
  postUserTransact,
  createNewCategory,
  createNewTransact,
  checkIsNewNameUniq
} from "../../../../utils";
import { Calculator } from "../../index.js";
import {
  useFormValidation,
  useTransactCrFormInputs
} from "../../../../hooks";
const { transactSchema } = validationSchema;

const TransactCreationForm = forwardRef(
  ({ user, onSuccess, cardType }, ref) => {
    const { accounts, categories } = user;
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [inputFields, setInputFields] = useTransactCrFormInputs();
    const { category } = inputFields;

    const handleInputChange = ({ target }) => {
      updateInputFields(target, setInputFields);
    };

    const handleAddNewCategory = ({ target }) => {
      const { name, value } = target;

      const newCategory = {
        id: "isNew",
        type: "category",
        name: value
      };

      setInputFields((prev) => ({
        ...prev,
        [name]: newCategory
      }));
    };

    const checkIsCategoryNameUniq = () => {
      return checkIsNewNameUniq(category, user.categories);
    };
    const isCategoryNameUniq = checkIsCategoryNameUniq();

    useEffect(() => {
      checkIsCategoryNameUniq();
      // eslint-disable-next-line
    }, [category]);

    const errors = useFormValidation(
      inputFields,
      transactSchema(isCategoryNameUniq)
    );
    const hasErrors = keys(errors).length;

    const generateNewIds = () => {
      const newTransactId = `transaction-id-${genNanoId()}`;
      const newCategoryId = `category-id-${genNanoId()}`;
      return { newTransactId, newCategoryId };
    };

    const postDataToUser = () => {
      const { newTransactId, newCategoryId } = generateNewIds();

      const newTransaction = createNewTransact({
        ...inputFields,
        newTransactId,
        cardType
      });

      if (category.id === "isNew") {
        newTransaction.category = newCategoryId;

        const newCategory = createNewCategory({
          ...inputFields,
          newCategoryId,
          newTransactId
        });
        postUserCategory(user.id, newCategory);
      }

      postUserTransact(user.id, newTransaction);
      onSuccess();
    };

    const handleSubmit = () => {
      setIsSubmitClicked(true);

      if (hasErrors) {
        return false;
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
              name={"account"}
              items={accounts}
              defaultValue={"Счет"}
              value={inputFields.account.name}
              touched={isSubmitClicked}
              onSelect={handleInputChange}
              error={errors.account}
            />

            <DropdownComponent
              name={"category"}
              items={categories}
              defaultValue={"Категория"}
              value={inputFields.category.name}
              placeholder={"Введите категорию"}
              isAdditionEnabled={true}
              touched={isSubmitClicked}
              onSelect={handleInputChange}
              onElemAdding={handleAddNewCategory}
              error={errors.category}
            />

            <DropdownComponent
              name={"currency"}
              items={user.currencies}
              defaultValue={"Валюта операции"}
              value={inputFields.currency.symbol}
              touched={isSubmitClicked}
              onSelect={handleInputChange}
              error={errors.currency}
            />
          </Col>
        </Row>

        <Row>
          <Col md={1} className="pb-3 md:pb-0">
            <DropdownSheet
              iconClass={"p-1.5"}
              defaultValue={<BiSolidCalculator size={23} />}
            >
              <Calculator name={"value"} onEval={handleInputChange} />
            </DropdownSheet>
          </Col>
          <Col md={6}>
            <TextField
              name={"value"}
              placeholder={"Сумма"}
              value={inputFields.value}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.value}
            />
          </Col>

          <Col md={5} className="pb-3 md:pb-0">
            <DatePicker
              name={"date"}
              value={inputFields.date}
              onChange={handleInputChange}
              error={errors.date}
            />
          </Col>
        </Row>

        <TextField
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
  }
);

TransactCreationForm.displayName = TransactCreationForm;

TransactCreationForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  cardType: PropTypes.string
};

export default TransactCreationForm;
