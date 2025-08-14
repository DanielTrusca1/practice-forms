import React from "react";
import { Field, reduxForm } from "redux-form";

const MyForm = ({ handleSubmit }) => (
  <div className="redux-form">
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <Field
        name="username"
        component="input"
        type="text"
        placeholder="Username"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default reduxForm({ form: "My Redux Form" })(MyForm);
