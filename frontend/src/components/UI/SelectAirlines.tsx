import React from "react";

import { Airline } from "../../types";

interface SelectAirlinesProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  airlines: Airline[];
  isAirlineChecked: boolean[];
  onAirlineChange: (position: number) => void;
}

const SelectAirlines: React.FC<SelectAirlinesProps> = ({
  airlines,
  isAirlineChecked,
  onAirlineChange,
  ...props
}) => {
  return (
    <div className="border-2 p-4 flex flex-col gap-2">
      <h2>Select airlines: </h2>
      {airlines?.map((airline, index) => (
        <label className="flex gap-2" key={airline.id}>
          <input
            id={airline.id}
            type={props.type}
            value={airline.name}
            name={airline.name}
            // uncontrolled input hack
            checked={isAirlineChecked[index] || false}
            onChange={() => onAirlineChange(index)}
          />
          <span>
            {airline.name} from {airline.country?.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SelectAirlines;
