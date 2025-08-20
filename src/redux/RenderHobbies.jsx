import { Field, getFormValues } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";
import { connect } from "react-redux";

let RenderHobbies = ({ fields, formState }) => {
  return (
    <div className="redux-hobbies-field">
      <label>Hobbies:</label>

      <button className="add-hobbie">+ Add Hobbie</button>

      {fields.map((name, index) => {
        return (
          <div className="hobbies-field" key={index}>
            <Field
              name={name}
              label="none"
              component={CustomInput}
              type="text"
              placeholder={`Hobby #${index + 1}`}
            />
          </div>
        );
      })}
    </div>
  );
};

// Decorate with connect to read form values
RenderHobbies = connect((state) => {
  const formState = getFormValues("My Redux Form")(state);
  return { formState };
})(RenderHobbies);

export default RenderHobbies;
