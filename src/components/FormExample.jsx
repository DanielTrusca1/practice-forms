import { reduxForm, Field } from "redux-form";

// Custom input field JSX example
const customInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}:</label>
    <input {...input} type={type} placeholder={label} />
    {touched && error && <span>{error}</span>}
  </div>
);

const onSubmit = (values) => {
  console.log(JSON.stringify(values));
};

const required = (val) => {
  if (!val || val === "") return "This field is required.";

  return undefined;
};

// Form JSX example
const Form = ({ handleSubmit }) => {
  return (
    <div>
      <h1>Redux Form</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          component={customInput}
          validate={required}
          label="Name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "My Redux Form Example",
  onSubmit,
})(Form);
