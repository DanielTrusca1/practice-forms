import React from "react";

const CustomInput = ({ label, name, rules, register, error, onBlur }) => {
  return (
    <div>
      <label>{label}:</label>
      <input {...register(name, rules)} placeholder={label} onBlur={onBlur} />
      <p>{error && error.message}</p>
    </div>
  );
};

export default CustomInput;
