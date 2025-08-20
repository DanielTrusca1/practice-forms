import React from "react";

const CustomInput = ({ label, name, register, error, onBlur }) => {

  return (
    <div>
      <label>{label}:</label>
      <input
        {...register(name)}
        placeholder={label}
        onBlur={onBlur}
      />
      <p>{error && error.message}</p>
    </div>
  );
};

export default CustomInput;
