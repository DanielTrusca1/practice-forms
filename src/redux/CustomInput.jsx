import React from "react";

const CustomInput = ({ input, label, meta, onBlurAdditional,placeholder, ...rest }) => {

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
        placeholder={placeholder ? placeholder : label}
        onBlur={handleBlur}
      />
      {meta.touched && meta.error && (
        <span className="validation-message">{meta.error}</span>
      )}
      {meta.asyncValidating && <p className="inner-tip">Loading...</p>}
    </div>
  );
};

export default CustomInput;
