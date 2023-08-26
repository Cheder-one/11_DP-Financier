import * as yup from "yup";
import validateDropdownRequired from "../func/validate/validateDropdownRequired";

const MIN_PASSWORD_LENGTH = 8;
const INCORRECT_EMAIL = `Некорректный email`;
const INCORRECT_PASSWORD = `Должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру`;

yup.setLocale({
  mixed: {
    default: `Некорректное значение`,
    required: `Обязательное поле`,
    oneOf: `Необходимо согласие`
  },
  string: {
    length: `Должно быть длиной в \${length} символов`,
    min: `Должно быть не менее ${MIN_PASSWORD_LENGTH} символов`,
    max: `Должно быть не более \${max} символов`,
    email: `Некорректный email`
  },
  number: {
    min: `Должно быть не менее \${min}`,
    max: `Должно быть не более \${max}`
  }
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, INCORRECT_EMAIL),
  password: yup.string().required()
});

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(
      /(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*\d)/g,
      INCORRECT_PASSWORD
    ),
  terms: yup.bool().oneOf([true])
});

const accountSchema = (isAccountUniq, isEntityUnique) =>
  yup.object().shape({
    name: yup
      .string()
      .required()
      .test(
        "account-is-unique",
        "Название уже существует",
        () => isAccountUniq
      ),
    entity: yup
      .object()
      .test(
        "entity-is-unique",
        "Категория уже существует",
        () => isEntityUnique
      )
      .test(
        "entity-required",
        "Укажите тип счета",
        validateDropdownRequired
      ),
    currency: yup
      .object()
      .test(
        "currency-required",
        "Укажите валюту счета",
        validateDropdownRequired
      ),
    value: yup
      .string()
      .matches(
        /^(?=\S+$)[^a-zA-Zа-яА-Я]*$/,
        "Значение должно состоять только из чисел"
      )
      .required()
  });

const transactSchema = (isCategoryUnique) =>
  yup.object().shape({
    account: yup
      .object()
      .test(
        "account-required",
        "Укажите счет",
        validateDropdownRequired
      )
      .required(),
    category: yup
      .object()
      .test(
        "category-is-unique",
        "Категория уже существует",
        () => isCategoryUnique
      )
      .test(
        "category-required",
        "Укажите категорию",
        validateDropdownRequired
      ),
    currency: yup
      .object()
      .test(
        "currency-required",
        "Укажите валюту операции",
        validateDropdownRequired
      ),
    value: yup
      .string()
      .matches(
        /^(?=\S+$)[^a-zA-Zа-яА-Яё]*$/,
        "Значение должно состоять только из чисел"
      )
      .required(),
    date: yup.string().required("Укажите дату транзакции")
  });

const validationSchema = {
  loginSchema,
  registerSchema,
  accountSchema,
  transactSchema
};

export default validationSchema;
