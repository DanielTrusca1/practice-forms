import React from "react";

const CustomInput = ({ label, name, register, error }) => {

  return (
    <div>
      <label>{label}:</label>
      <input
        {...register(name)}
        placeholder={label}
      />
      <p>{error && error.message}</p>
    </div>
  );
};

export default CustomInput;
