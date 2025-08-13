import { reduxForm, Field } from "redux-form";

import CustomInput from "./CustomInput";

// Custom input field JSX example
const customInput = (props) => <CustomInput {...props.input} type="text" />;

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
        <Field name="name" component={customInput} validate={required}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "My Redux Form Example",
  onSubmit,
})(Form);
