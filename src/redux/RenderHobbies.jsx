import { change, Field, getFormValues } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";
import { connect } from "react-redux";

let renderHobbies = ({ fields, formState }) => {
  const handleAdd = () => {
    fields.push(formState.addHobbies);
    change("My Redux Form", "addHobbies", "ABC");
  };

  return (
    <div className="redux-hobbies-field">
      <label>Hobbies:</label>
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

            <button
              type="button"
              onClick={() => fields.remove(index)}
              style={{ backgroundColor: "rgb(255, 100, 100)" }}
            >
              x
            </button>
          </div>
        );
      })}
      <div className="hobbies-field">
        <Field
          name="addHobbies"
          label="none"
          component={CustomInput}
          type="text"
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{ backgroundColor: "rgb(30, 200, 30)" }}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Decorate with connect to read form values
renderHobbies = connect((state) => {
  const formState = getFormValues("My Redux Form")(state);

  return { formState };
})(renderHobbies);

export default renderHobbies;
