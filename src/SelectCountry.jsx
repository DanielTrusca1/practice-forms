import Select from "react-select";
import countryList from "react-select-country-list";

import React, { useMemo } from "react";

const getFlagEmoji = (isoCode) =>
  isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));

const SelectCountry = () => {
  const countries = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        value: country.value,
        label: `${getFlagEmoji(country.value)} ${country.label}`,
      }));
  }, []);
  return (
    <Select
      className="react-select"
      classNamePrefix="react-select"
      options={countries}
      isClearable
      placeholder="Country"
    />
  );
};

export default SelectCountry;
