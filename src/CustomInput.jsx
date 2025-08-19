import React from "react";

const CustomInput = ({ label, register, required, errors }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...register(label, { required })} />
      <p>{errors.name?.message}</p>
    </div>
  );
};

export default CustomInput;
