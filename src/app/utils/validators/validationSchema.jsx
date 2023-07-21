import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 8;
const INCORRECT_EMAIL = `Некорректный email`;
const INCORRECT_PASSWORD = `Должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру`;

const dropdownRequired = (value) => {
  if (value && typeof value === "object") {
    return "id" in value && "name" in value;
  }
  return false;
};

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

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, INCORRECT_EMAIL),
  password: yup.string().required()
  // stayOn: yup.boolean().oneOf([true]).required()
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(/(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*\d)/g, INCORRECT_PASSWORD),
  terms: yup.bool().oneOf([true])
});

export const accountSchema = yup.object().shape({
  account: yup
    .object()
    .test("account-required", "Укажите тип счета", dropdownRequired),
  currency: yup
    .object()
    .test("account-required", "Укажите валюту счета", dropdownRequired),
  name: yup.string().required(),
  sum: yup.number().typeError("Укажите корректный баланс счета").required()
});
