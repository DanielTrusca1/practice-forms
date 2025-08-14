import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

import CustomInput from "./CustomInput";
import SelectCountry from "../SelectCountry";
import HobbiesInputArray from "./HobbiesInputArray";

const required = (value) => (value ? undefined : "Required");

const minLength = (min) => (value) =>
  value && value.length < min ? `Must be at least ${min} chars` : undefined;

const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be at most ${max} chars` : undefined;

const onlyLetters = (value) =>
  value && /^[A-Za-z]+$/.test(value) ? undefined : "Only letter allowed";

const validEmail = (value) =>
  value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? undefined
    : "Invalid email adress";

const MyForm = ({ handleSubmit }) => (
  <div className="redux-form">
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <Field
        name="Name"
        label="Name"
        component={CustomInput} /// Use the custom input component instead of the default !
        type="text"
        validate={[required, minLength(3), maxLength(50), onlyLetters]}
      />
      <Field name="email" label="Email" component={CustomInput} type="email" />
      <Field
        name="backupEmail"
        label="Backup-Email"
        component={CustomInput}
        type="email"
        validate={validEmail}
      />

      <SelectCountry />

      <FieldArray name="hobbies" component={HobbiesInputArray} />

      <Field
        name="username"
        label="Username"
        component={CustomInput}
        type="text"
        validate={validEmail}
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default reduxForm({
  form: "My Redux Form",
  initialValues: {
    hobbies: [""],
  },
  enableReinitialize: true,
})(MyForm);
