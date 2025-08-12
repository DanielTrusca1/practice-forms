import { useSelector, useDispatch } from "react-redux";

import { updateField, resetForm } from "../redux/formSlice";
import HobbiesInput from "../HobbiesInput";

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
        <p>Name: </p>
        <input
          value={form.name}
          onChange={(e) =>
            dispatch(updateField({ field: "name", value: e.target.value }))
          }
        />
        <p>Email: </p>

        <input
          value={form.email}
          onChange={(e) =>
            dispatch(updateField({ field: "email", value: e.target.value }))
          }
        />
        <p>Backup Email: </p>
        <input
          value={form.backupEmail}
          onChange={(e) =>
            dispatch(
              updateField({ field: "backupEmail", value: e.target.value })
            )
          }
        />

        <p>Hobbies: </p>

        <HobbiesInput />

        <p>Username: </p>
        <input
          value={form.username}
          onChange={(e) =>
            dispatch(updateField({ field: "username", value: e.target.value }))
          }
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
