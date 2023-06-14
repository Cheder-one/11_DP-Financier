import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import { validate } from "../../../utils/validators/default/validate";
import { loginSchema } from "../../../utils/validators/default/validationSchema";
import API from "../../../api/index.api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { genderOptions } from "../../../utils/data/fieldsOptions";
import CheckboxField from "../../common/form/checkboxField";

const RegisterForm = ({ entryBtnText }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    profession: "",
    gender: "other",
    qualities: [],
    privacyPolicy: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    API.professions.fetchAll().then((profs) => {
      const professionsList = Object.keys(profs).map((profName) => ({
        label: profs[profName].name,
        value: profs[profName]._id
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((quals) => {
      const qualitiesList = Object.keys(quals).map((profName) => ({
        label: quals[profName].name,
        value: quals[profName]._id,
        color: quals[profName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const foundErrors = validate(inputFields, loginSchema);
    setErrors(foundErrors);
  }, [inputFields]);

  const hasErrors = Object.keys(errors).length !== 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasErrors) return;
    const { profession: profId, qualities: selectedQuals } = inputFields;

    console.log({
      ...inputFields,
      profession: getProfessionById(profId),
      qualities: getQualities(selectedQuals)
    });
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={"Email:"}
        type="text"
        name="email"
        value={inputFields.email}
        onChange={handleInputChange}
        error={errors.email}
      />
      <TextField
        label={"Пароль:"}
        type="password"
        name="password"
        value={inputFields.password}
        onChange={handleInputChange}
        error={errors.password}
      />
      <SelectField
        label="Ваша профессия:"
        name="profession"
        value={inputFields.profession}
        onChange={handleInputChange}
        options={professions}
        error={errors.profession}
      />
      <RadioField
        label="Ваш пол:"
        name="gender"
        value={inputFields.gender}
        options={genderOptions}
        onChange={handleInputChange}
        error={errors.gender}
      />
      <MultiSelectField
        label={"Ваши качества:"}
        name="qualities"
        defaultValue={inputFields.qualities}
        options={qualities}
        onChange={handleInputChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <CheckboxField
        name="privacyPolicy"
        value={inputFields.privacyPolicy}
        onChange={handleInputChange}
        error={errors.privacyPolicy}
      >
        Согласен с <a href="#">политикой конфиденциальности</a>
      </CheckboxField>
      <button
        disabled={hasErrors}
        className={"btn btn-primary w-100 mx-auto"}
        type="submit"
      >
        {entryBtnText}
      </button>
    </form>
  );
};

RegisterForm.defaultProps = {
  entryBtnText: "Регистрация"
};

RegisterForm.propTypes = {
  entryBtnText: PropTypes.string
};

export default RegisterForm;
