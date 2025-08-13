import { reduxForm, Field } from "redux-form";

// Custom input field JSX example
const customInput = (props) => (
  <input type="text" />
)

// Form JSX example
const Form = () => (
  <div>
    <h1>Redux Form</h1>
    <form>
      <Field name="name" component={customInput}/>
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default reduxForm({
  form: "My Redux Form Example"
})(Form);