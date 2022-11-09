import React from "react";
import useAppSelector from "../../app/hooks/useAppSelector";

import AirportForm from "./AirportForm";
import AirportInfo from "./AirportInfo";

const Airports: React.FC = () => {
  const airports = useAppSelector(({ airport }) => airport);

  return (
    <div className="flex items-center justify-center gap-4 h-screen">
      <div className="w-1/2">
        <AirportForm />
      </div>
      <div className="w-1/2 overflow-y-scroll h-full flex flex-col gap-4">
        {airports.map((airport) => (
          <div
            key={airport.id}
            className="m-4 border-2 flex flex-col items-center p-4 h-full"
          >
            <AirportInfo airport={airport} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Airports;
