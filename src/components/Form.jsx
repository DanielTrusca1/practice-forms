import { useSelector, useDispatch } from "react-redux";

import { updateField, resetForm } from "../redux/formSlice";

const Form = () => {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  return (
    <div className="redux-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form);
        }}
      >
        <input
          value={form.name}
          onChange={(e) =>
            dispatch(updateField({ field: "name", value: e.target.value }))
          }
          placeholder="Name"
        />
        <input
          value={form.email}
          onChange={(e) =>
            dispatch(updateField({ field: "email", value: e.target.value }))
          }
          placeholder="Email"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
