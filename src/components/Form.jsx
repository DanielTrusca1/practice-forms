import { useSelector, useDispatch } from "react-redux";

import { updateField } from "../redux/formSlice";
import HobbiesInput from "../HobbiesInput";
import { useState } from "react";

const Form = () => {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // Track validation errors
  const [errors, setErrors] = useState({});

  // Validate individual input fields
  const validate = (field, value) => {
    let errorMessage = "";

    if (field === "name") {
      if (value === "") errorMessage = "This field is required.";
      if (value.length < 3) errorMessage = "Minimum length is 3.";
      if (value.length > 50) errorMessage = "Maximum length is 50.";

      const isAlphaRegex = /^[A-Za-z]+$/;
      if (isAlphaRegex.test(value) === false)
        errorMessage = "Only letters are allowed.";
    }

    if (field === "email" || field === "backupEmail") {
      if (value === "") errorMessage = "This field is required.";

      const isEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (isEmailRegex.test(value) === false)
        errorMessage = "Must be a valid email adress";
    }

    // Update errors object state
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));

    // Return true if field is valid
    return errorMessage === "";
  };

  // Dispatch input change for updating state
  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }));
    validate(field, value);
  };

  // Autofill backup email unless specified
  const autofillBackupEmail = (e) => {
    const value = e.target.value;

    if (form.backupEmail === "")
      dispatch(updateField({ field: "backupEmail", value }));
  };

  return (
    <div className="redux-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);
        }}
      >
        <p>Name: </p>
        <input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <p className="validation-message">{errors.name}</p>}

        <p>Email: </p>
        <input
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={autofillBackupEmail}
        />
        {errors.email && <p className="validation-message">{errors.email}</p>}

        <p>Backup Email: </p>
        <input
          value={form.backupEmail}
          onChange={(e) => handleChange("backupEmail", e.target.value)}
        />
        {errors.backupEmail && (
          <p className="validation-message">{errors.backupEmail}</p>
        )}

        <p>Hobbies: </p>

        <HobbiesInput />

        <p>Username: </p>
        <input
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        {errors.username && (
          <p className="validation-message">{errors.username}</p>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
