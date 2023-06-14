import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 8;

yup.setLocale({
  mixed: {
    default: `Некорректное значение`,
    required: `Обязательное поле`
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
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .matches(
      /(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*\d)/g,
      `Должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру`
    )
});

export default validationSchema;
