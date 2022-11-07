import React from "react";
import { Airline } from "../../types";

interface AirlineInfoProps {
  airline: Airline;
}

const AirlineInfo: React.FC<AirlineInfoProps> = ({ airline }) => {
  return (
    <div className="flex gap-4 p-4">
      <div>
        <h1>Name: {airline.name}</h1>
        <h2>Country: {airline.country?.name}</h2>
      </div>
      <div>
        <p>Can be found at:</p>
        {airline.airports?.map((airport) => (
          <p key={airport.id}>- {airport.name}</p>
        ))}
      </div>
    </div>
  );
};

export default AirlineInfo;
