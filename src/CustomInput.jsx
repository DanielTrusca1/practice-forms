import React from "react";

const CustomInput = ({ label, register, required, error }) => {
  return (
    <div>
      <label>{label}:</label>
      <input {...register(label, { required })} placeholder={label}/>
      <p>{error && error.message}</p>
    </div>
  );
};

export default CustomInput;
