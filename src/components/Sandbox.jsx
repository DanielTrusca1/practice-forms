import { useSelector, useDispatch } from "react-redux";

import { increment } from "../redux/store";

import Form from "./FormExample";

const Sandbox = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="sandbox">
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>

      <Form/>
    </div>
  );
};

export default Sandbox;
