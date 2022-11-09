import React from "react";
import { Airport } from "../../types";

interface CheckboxAirportsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  airports: Airport[];
  isAirportChecked: boolean[];
  onAirportChange: (position: number) => void;
}

const CheckboxAirports: React.FC<CheckboxAirportsProps> = ({
  airports,
  isAirportChecked,
  onAirportChange,
  ...props
}) => {
  return (
    <div className="border-2 p-4 flex flex-col gap-2">
      <h2>Add to airports: </h2>
      {airports?.map((airport, index) => (
        <label className="flex gap-2" key={airport.id}>
          <input
            id={airport.id}
            type={props.type}
            value={airport.name}
            name={airport.name}
            // uncontrolled input hack
            checked={isAirportChecked[index] || false}
            onChange={() => onAirportChange(index)}
          />
          <span>
            {airport.name} in {airport.country?.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxAirports;
