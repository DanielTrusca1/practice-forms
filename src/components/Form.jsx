import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useBlocker, useNavigate } from "react-router";

import { updateField, resetForm } from "../redux/formSlice";
import HobbiesInput from "../HobbiesInput";
import { useState } from "react";
import SelectCountry from "../SelectCountry";

const Form = () => {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const [isValidating, setIsValidating] = useState(false);

  // Track validation errors
  const [errors, setErrors] = useState({});

  // Validate individual input fields
  const validate = async (field, value) => {
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

    if (field === "username") {
      if (value === "") errorMessage = "This field is required.";

      setIsValidating(true);

      await new Promise((resolve) => setTimeout(resolve, 1300)); // 1s delay

      setIsValidating(false);

      if (value.toLowerCase().startsWith("john"))
        errorMessage = "Username already taken.";
    }

    // Update errors object state
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));

    // Return true if field is valid
    return errorMessage === "";
  };

  // Dispatch input change for updating state
  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  // Autofill backup email unless specified
  const autofillBackupEmail = (e) => {
    if (form.email === "") return;

    const value = e.target.value;

    if (form.backupEmail === "")
      dispatch(updateField({ field: "backupEmail", value }));
  };

  // Block navigation if the form has changes
  const navigate = useNavigate();
  const isDirty = useSelector((state) => state.form.isDirty);

  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));

  const leave = () => {
    navigate("/about");
  };

  return (
    <div className="redux-form">
      <button onClick={leave}>Go to a different page</button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);
          dispatch(resetForm());
        }}
      >
        <p>Name: </p>
        <input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => validate("name", e.target.value)}
        />
        {errors.name && <p className="validation-message">{errors.name}</p>}

        <p>Email: </p>
        <input
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={(e) => {
            validate("email", e.target.value);
            autofillBackupEmail();
          }}
        />
        {errors.email && <p className="validation-message">{errors.email}</p>}

        <p>Backup Email: </p>
        <input
          value={form.backupEmail}
          onBlur={(e) => validate("backupEmail", e.target.value)}
        />
        {errors.backupEmail && (
          <p className="validation-message">{errors.backupEmail}</p>
        )}

        <p>Country: </p>
        <SelectCountry />

        <p>Hobbies: </p>

        <HobbiesInput />

        <div>
          <p>Username: </p>
          <input
            value={form.username}
            onChange={(e) => {
              handleChange("username", e.target.value);
              validate("username", e.target.value);
            }}
          />
          {isValidating && <p className="inner-tip">Loading...</p>}

          {errors.username && (
            <p className="validation-message">{errors.username}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>

      {blocker.state === "blocked" && (
        <div className="modal">
          <p>This form has unsaved changes</p>
          <p>
            <button type="button" onClick={() => blocker.proceed()}>
              Leave
            </button>{" "}
            <button type="button" onClick={() => blocker.reset()}>
              Stay here
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Form;
