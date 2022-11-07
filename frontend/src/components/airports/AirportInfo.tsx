import React from "react";
import { Airport } from "../../types";

interface AirportInfoProps {
  airport: Airport;
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport }) => {
  const location = {
    lat: +airport.location.lat,
    lng: +airport.location.lng,
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1>Name: {airport.name}</h1>
        <h2>Country: {airport.country?.name}</h2>
      </div>
      <div>
        <p>Location:</p>
        <p>LAT: {location.lat}</p>
        <p>LNG: {location.lng}</p>
      </div>
      <div>
        <p>Available Airlines:</p>
        {airport.airlines?.map((airline) => (
          <p>- {airline.name}</p>
        ))}
      </div>
    </div>
  );
};

export default AirportInfo;
