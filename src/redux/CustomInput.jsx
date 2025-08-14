import React from "react";

const CustomInput = ({ input, label, meta, onBlurAdditional, ...rest }) => {
  const handleBlur = (e) => {
    if (onBlurAdditional) onBlurAdditional(e);

    input.onBlur(e);
  };

  return (
    <div>
      {label !== "none" && <label>{label}:</label>}
      <input
        {...input}
        {...rest}
        placeholder={label === "none" ? "" : label}
        onBlur={handleBlur}
      />
      {meta.touched && meta.error && (
        <span className="validation-message">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomInput;
