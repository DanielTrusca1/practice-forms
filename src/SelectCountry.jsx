import Select from "react-select";

const options = [
  { value: "romania", label: "Romania" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
];

const SelectCountry = () => {
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
