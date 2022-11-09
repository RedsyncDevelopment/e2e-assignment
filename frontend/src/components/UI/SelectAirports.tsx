import React from "react";
import { Airport } from "../../types";

interface SelectAirportsProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  airports: Airport[];
  countryCode: string;
  airportId: string;
}

const SelectAirports: React.FC<SelectAirportsProps> = ({
  airports,
  airportId,
  countryCode,
  ...props
}) => {
  return (
    <>
      <div>Airport: </div>
      {!countryCode ? (
        <div>Please Select a Country</div>
      ) : (
        <select
          value={airportId}
          onChange={props.onChange}
          name={props.name}
          className="p-4 border-2 w-96"
        >
          <option value="">-- Select an Airport --</option>
          {airports.map((airport) =>
            airport.country?.code === countryCode ? (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ) : null
          )}
        </select>
      )}
    </>
  );
};

export default SelectAirports;
