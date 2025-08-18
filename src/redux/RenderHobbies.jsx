import { Field } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";

const renderHobbies = ({ fields }) => {
  const handleAdd = () => {
    fields.push("");
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
        <Field name="add" label="none" component={CustomInput} type="text" />
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

export default renderHobbies;
