import React from "react";
import { useAppSelector } from "../../app/hooks";
import AirportForm from "./AirportForm";
import AirportInfo from "./AirportInfo";

interface AirportsProps {}

const Airports: React.FC<AirportsProps> = ({}) => {
  const airports = useAppSelector(({ airport }) => airport);

  return (
    <>
      {airports.map((airport) => (
        <div className="border-2">
          <AirportInfo airport={airport} />
        </div>
      ))}
      <AirportForm />
    </>
  );
};

export default Airports;
