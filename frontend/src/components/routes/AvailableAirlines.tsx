import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Airline } from "../../types";

interface AvailableAirlinesProps {
  airlines: Airline[];
  departingAirport: string;
  destinationAirport: string;
}

const AvailableAirlines: React.FC<AvailableAirlinesProps> = ({
  airlines,
  departingAirport,
  destinationAirport,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {airlines.map((airline) => {
        if (
          airline.airports
            ?.map((airport) => airport.id)
            .includes(departingAirport) &&
          airline.airports
            ?.map((airport) => airport.id)
            .includes(destinationAirport)
        ) {
          return (
            <li key={airline.id} className="flex items-center gap-4">
              <span>
                <AiOutlineCheckCircle />
              </span>
              <span className="text-lg">
                {airline.name} from {airline.country?.name}
              </span>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};

export default AvailableAirlines;
