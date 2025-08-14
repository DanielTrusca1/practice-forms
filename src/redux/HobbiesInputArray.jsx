import { Field } from "redux-form";

// Custom Input component
import CustomInput from "./CustomInput";

const HobbiesInputArray = ({ fields }) => {
  return (
    <div className="redux-hobbies-field">
      {fields.map((name, index) => (
        <div key={index}>
          <Field
            name={name}
            label={name}
            component={CustomInput}
            type="text"
            placeholder={`Hobby #${index + 1}`}
          />
          <button type="button" onClick={() => fields.remove(index)}>
            x
          </button>
        </div>
      ))}

      <Field
        name="addHobby"
        label="Add Hobby"
        component={CustomInput}
        type="text"
      />
      <button type="button" onClick={() => fields.push()}>
        +
      </button>
    </div>
  );
};

export default HobbiesInputArray;
