import React from "react";
import {
  Field,
  FieldArray,
  reduxForm,
  change,
  getFormValues,
} from "redux-form";

import CustomInput from "./CustomInput";
import SelectCountry from "../SelectCountry";
import RenderHobbies from "./RenderHobbies";

// Dispatch actions to reducers
import { connect, useDispatch } from "react-redux";

// Get form state from Redux
import { formValueSelector } from "redux-form";
import { useSelector } from "react-redux";

// Import async validate function for username avaiability check
import asyncValidate from "./UsernameAsyncValidate";

const required = (value) => (value ? undefined : "Required");

const minLength = (min) => (value) =>
  value === undefined || value.length < min
    ? `Must be at least ${min} chars`
    : undefined;

const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be at most ${max} chars` : undefined;

const onlyLetters = (value) =>
  value && /^[A-Za-z]+$/.test(value) ? undefined : "Only letter allowed";

const validEmail = (value) =>
  value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? undefined
    : "Invalid email adress";

// Export validation methods
export { required, minLength, maxLength, onlyLetters };

let MyForm = (props) => {
  // Extract component props
  const { handleSubmit } = props;

  // Extract dispatch & selector objects
  const dispatch = useDispatch();
  const selector = formValueSelector("My Redux Form");

  const backupEmailValue = useSelector((state) =>
    selector(state, "backupEmail")
  );

  const autofillBackupEmail = (e) => {
    // Avoid attempting to autofill with undefined
    if (!e.target.value) return;

    if (!backupEmailValue)
      dispatch(change("My Redux Form", "backupEmail", e.target.value));
  };

  return (
    <div className="redux-form">
      <form onSubmit={handleSubmit((values) => console.log(values))}>
        <Field
          name="name"
          label="Name"
          component={CustomInput} /// Use the custom input component instead of the default !
          type="text"
          validate={[required, minLength(3), maxLength(50), onlyLetters]}
        />
        <Field
          name="email"
          label="Email"
          component={CustomInput}
          type="text"
          validate={validEmail}
          onBlurAdditional={autofillBackupEmail}
        />
        <Field
          name="backupEmail"
          label="Backup-Email"
          component={CustomInput}
          type="text"
          validate={validEmail}
        />

        <SelectCountry />

        <FieldArray name="hobbies" component={RenderHobbies} />

        <Field
          name="username"
          label="Username"
          component={CustomInput}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const form = "My Redux Form";

// Decorate with Redux Form
MyForm = reduxForm({
  form,
  asyncValidate,
  asyncBlurFields: ["username"],
})(MyForm);

// Decorate with connect to read form state
MyForm = connect((state) => {
  const formState = getFormValues(form)(state);

  return { formState };
})(MyForm);

export default MyForm;
