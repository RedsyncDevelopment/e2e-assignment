import React, { useEffect, useState } from "react";
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
  const [availableAirlines, setAvailableAirlines] = useState<Airline[]>([]);

  useEffect(() => {
    setAvailableAirlines(
      airlines
        .filter((airline) =>
          airline.airports
            ?.map((airport) => airport.id)
            .includes(departingAirport)
        )
        .filter((airline) =>
          airline.airports
            ?.map((airport) => airport.id)
            .includes(destinationAirport)
        )
    );
  }, [airlines, departingAirport, destinationAirport]);

  return availableAirlines.length > 0 ? (
    <ul className="flex flex-col gap-2">
      {availableAirlines.map((airline) => (
        <li key={airline.id} className="flex items-center gap-4 border-2 p-4">
          <span>
            <AiOutlineCheckCircle />
          </span>
          <span className="text-lg">
            {airline.name} from {airline.country?.name}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <div>There Are No Available Airlines Betweeen These Airports</div>
  );
};

export default AvailableAirlines;
