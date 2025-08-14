import React from "react";

const CustomInput = ({ input, label, meta, ...rest }) => {
  return (
    <div>
      {label !== "none" && <label>{label}:</label>}
      <input {...input} {...rest} placeholder={label === "none" ? "" : label} />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
};

export default CustomInput;
