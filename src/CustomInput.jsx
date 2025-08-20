import React from "react";

const CustomInput = ({ label, name, register, error, onBlur, isValidating}) => {

  return (
    <div>
      <label>{label}:</label>
      <input {...register(name)} placeholder={label} onBlur={onBlur} />
      <p>{error && error.message}</p>
      {isValidating && <p className="inner-tip">Loading...</p>}
    </div>
  );
};

export default CustomInput;
