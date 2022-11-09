import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import useAppSelector from "../../app/hooks/useAppSelector";
import SelectAirports from "../UI/SelectAirports";
import SelectCountry from "../UI/SelectCountry";
import AvailableAirlines from "./AvailableAirlines";

interface AvailableRoutesProps {}

const AvailableRoutes: React.FC<AvailableRoutesProps> = ({}) => {
  const airlines = useAppSelector(({ airline }) => airline);
  const airports = useAppSelector(({ airport }) => airport);
  const countries = useAppSelector(({ country }) => country);

  const [departingCountry, setDepartingCountry] = useState<string>("");
  const [destinationCountry, setDestinationCountry] = useState<string>("");
  const [departingAirport, setDepartingAirport] = useState<string>("");
  const [destinationAirport, setDestinationAirport] = useState<string>("");

  return (
    <div className="grid grid-cols-2 gap-y-6 justify-items-center auto-rows-min">
      <h1 className="py-12 text-4xl font-bold col-span-2">
        Where Can You Get?
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <div>From: </div>
        <SelectCountry
          countries={countries}
          value={departingCountry}
          onChange={(e) => setDepartingCountry(e.target.value)}
          id="departing-country"
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div>To: </div>
        <SelectCountry
          countries={countries}
          onChange={(e) => setDestinationCountry(e.target.value)}
          value={destinationCountry}
          id="destination-country"
        />
      </div>
      <div className="col-span-2 self-center">
        <AiOutlineArrowRight className="w-8 h-8" />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <SelectAirports
          countryCode={departingCountry}
          airportId={departingAirport}
          airports={airports}
          value={departingAirport}
          onChange={(e) => setDepartingAirport(e.target.value)}
          name="departing-airport"
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <SelectAirports
          countryCode={destinationCountry}
          airportId={destinationAirport}
          airports={airports}
          value={destinationAirport}
          onChange={(e) => setDestinationAirport(e.target.value)}
          name="departing-airport"
        />
      </div>
      <div className="pt-16 col-span-2 flex flex-col items-center space-y-4">
        <p className="text-xl font-bold">Available Airlines on That Route:</p>
        <AvailableAirlines
          airlines={airlines}
          departingAirport={departingAirport}
          destinationAirport={destinationAirport}
        />
      </div>
    </div>
  );
};

export default AvailableRoutes;
