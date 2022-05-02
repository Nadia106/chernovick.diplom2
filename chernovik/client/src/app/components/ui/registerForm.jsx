import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import RadioField from "../common/form/radioField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    sex: "male",
    license: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать как минимум одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать как минимум одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      min: {
        message: "Имя должно состоять минимум из 2 символов",
        value: 2
      }
    },
    phoneNumber: {
      isRequired: {
        message: "Номер телефона обязательно для заполнения"
      },
      min: {
        message: "Номер телефона должен состоять минимум из 11 символов",
        value: 11
      }
    },
    max: {
      value: 12
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data
    };
    dispatch(signUp(newData));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <TextField
        label="Имя"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Номер телефона"
        type="number"
        name="phoneNumber"
        value={data.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" }
        ]}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
        value={data.sex}
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Принять
      </button>
    </form>
  );
};

export default RegisterForm;
