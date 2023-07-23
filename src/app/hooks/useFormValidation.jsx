import { useState, useEffect } from "react";

const useFormValidation = (inputFields, validationSchema, dependents) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validationSchema
      .validate(inputFields, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch(({ inner }) => {
        const newErrors = {};
        for (const error of inner) {
          newErrors[error.path] = error.message;
        }
        setErrors(newErrors);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependents || [inputFields]);

  return errors;
};

export default useFormValidation;
