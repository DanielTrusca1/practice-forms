import Select from "react-select";
import countryList from "react-select-country-list";

import React, { useMemo } from "react";
const SelectCountry = () => {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <Select
      className="react-select"
      classNamePrefix="react-select"
      options={options}
      isClearable
    />
  );
};

export default SelectCountry;
