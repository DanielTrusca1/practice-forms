import { change, Field, getFormValues } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";
import { connect, useDispatch } from "react-redux";

let RenderHobbies = ({ fields, formState }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    // Prevent undefined value erorr in case input is empty
    //if (!formState) return;

    // fields.push(formState.addHobbies);
    fields.push("");

    //dispatch(change("My Redux Form", "addHobbies", ""));
  };

  return (
    <div className="redux-hobbies-field">
      <label>Hobbies:</label>
      {fields.map((name, index) => {
        console.log(name, index);
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
RenderHobbies = connect((state) => {
  const formState = getFormValues("My Redux Form")(state);
  return { formState };
})(RenderHobbies);

export default RenderHobbies;
