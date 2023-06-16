import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 8;
const INCORRECT_EMAIL = `Некорректный email`;
const INCORRECT_PASSWORD = `Должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру`;

yup.setLocale({
  mixed: {
    default: `Некорректное значение`,
    required: `Обязательное поле`,
    oneOf: `Поле должно быть отмечено`
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

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, INCORRECT_EMAIL),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(/(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*\d)/g, INCORRECT_PASSWORD),
  stayOn: yup.boolean().oneOf([true]).required()
});

export default validationSchema;
