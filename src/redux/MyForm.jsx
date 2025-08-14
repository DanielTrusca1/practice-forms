import React from "react";
import { Field, reduxForm } from "redux-form";

import CustomInput from "./CustomInput";

const MyForm = ({ handleSubmit }) => (
  <div className="redux-form">
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <Field
        name="Name"
        label="Name"
        component={CustomInput} /// Use the custom input component instead of the default !
        type="text"
      />
      <Field
        name="email"
        label="Email"
        component={CustomInput} /// Use the custom input component instead of the default !
        type="email"
      />
      <Field
        name="backupEmail"
        label="Backup-Email"
        component={CustomInput} /// Use the custom input component instead of the default !
        type="email"
      />

      <Field
        name="username"
        label="Username"
        component={CustomInput} /// Use the custom input component instead of the default !
        type="text"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default reduxForm({ form: "My Redux Form" })(MyForm);
