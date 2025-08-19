import { change, Field, getFormValues } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";
import { connect } from "react-redux";
import { useEffect } from "react";

let RenderHobbies = ({ fields, formState }) => {
  // Display initial field with + button
  useEffect(() => {
    fields.push("");
  }, []);

  return (
    <div className="redux-hobbies-field">
      <label>Hobbies:</label>
      {fields.map((name, index) => {
        console.log(name);
        const isFirst = index === 0;
        return (
          <div className="hobbies-field" key={index}>
            <Field
              name={name}
              label="none"
              component={CustomInput}
              type="text"
              placeholder={`Hobby #${index + 1}`}
            />
            {!isFirst ? (
              <button
                type="button"
                onClick={() => fields.remove(index)}
                style={{ backgroundColor: "rgb(255, 100, 100)" }}
              >
                x
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  fields.push("");
                  console.log(`hobbies[${0}]`);
                  change(`hobbies[${0}].value`, "abc");
                }}
                style={{ backgroundColor: "rgb(30, 200, 30)" }}
              >
                +
              </button>
            )}
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
