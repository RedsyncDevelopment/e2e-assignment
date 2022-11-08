import React from "react";
import { Country } from "../../types";

interface SelectCountryProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  countries: Country[];
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  countries,
  ...props
}) => {
  return (
    <select
      onChange={props.onChange}
      name={props.name}
      id={props.id}
      value={props.value}
      className={`p-4 border-2 ${props.className}`}
    >
      <option value="">-- Select a Country --</option>
      {countries?.map((country) => (
        <option key={country.id} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
