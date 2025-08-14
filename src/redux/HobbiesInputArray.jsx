import { Field } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";

const HobbiesInputArray = ({ fields, lastValue }) => {
  const handleAdd = () => {
    if (!lastValue) return;

    fields.push("");
  };

  return (
    <div className="redux-hobbies-field">
      <label>Hobbies:</label>
      {fields.map((name, index) => {
        const isLast = index === fields.length - 1;
        return (
          <div className="hobbies-field" key={index}>
            <Field
              name={name}
              label="none"
              component={CustomInput}
              type="text"
              placeholder={`Hobby #${index + 1}`}
            />
            {isLast ? (
              <button
                type="button"
                onClick={handleAdd}
                style={{ backgroundColor: "rgb(30, 200, 30)" }}
              >
                +
              </button>
            ) : (
              <button
                type="button"
                onClick={() => fields.remove(index)}
                style={{ backgroundColor: "rgb(255, 100, 100)" }}
              >
                x
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HobbiesInputArray;
