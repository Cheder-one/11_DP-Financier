import PropTypes from "prop-types";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect
} from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BiSolidCalculator } from "react-icons/bi";
import { keys, some } from "lodash";

import {
  DropdownComponent,
  DropdownSheet,
  DatePicker,
  TextField
} from "../../../common/form";
import {
  getNanoId,
  validationSchema,
  updateInputFields,
  postUserCategory,
  postUserTransact,
  createNewCategory,
  createNewTransact,
  checkIsNewNameUniq
} from "../../../../utils";
import { Calculator } from "../../index.js";
import { useFormValidation } from "../../../../hooks";
const { transactSchema } = validationSchema;

const TransactCreationForm = forwardRef(
  ({ user, onSuccess, cardType }, ref) => {
    const { accounts, categories } = user;
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [inputFields, setInputFields] = useState({
      account: { id: "", name: "" },
      date: new Date(),
      category: { id: "", name: "" },
      amount: "",
      comment: ""
    });
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
      const newTransactId = `transaction-id-${getNanoId()}`;
      const newCategoryId = `category-id-${getNanoId()}`;
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
          </Col>
        </Row>

        <Row>
          <Col md={1} className="pb-3 md:pb-0">
            <DropdownSheet
              iconClass={"p-1.5"}
              defaultValue={<BiSolidCalculator size={23} />}
            >
              <Calculator
                name={"amount"}
                onEval={handleInputChange}
              />
            </DropdownSheet>
          </Col>
          <Col md={6}>
            <TextField
              name={"amount"}
              placeholder={"Сумма"}
              value={inputFields.amount}
              isSubmit={isSubmitClicked}
              onChange={handleInputChange}
              error={errors.amount}
            />
          </Col>
          <Col md={5} className="pb-3 md:pb-0">
            <DatePicker
              name={"date"}
              value={inputFields.date}
              onChange={handleInputChange}
            >
              <Form.Control
                className={errors?.date ? "is-invalid" : "is-valid"}
              />
            </DatePicker>
            {errors.date && (
              <div className="text-sm text-danger pt-1 mb-3">
                {errors.date}
              </div>
            )}
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
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  cardType: PropTypes.string
};

export default TransactCreationForm;
