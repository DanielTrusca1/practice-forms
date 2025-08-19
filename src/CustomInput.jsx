import React from "react";

const CustomInput = ({ label, name, rules, register, error }) => {
  return (
    <div>
      <label>{label}:</label>
      <input {...register(name, rules)} placeholder={label}/>
      <p>{error && error.message}</p>
    </div>
  );
};

export default CustomInput;
