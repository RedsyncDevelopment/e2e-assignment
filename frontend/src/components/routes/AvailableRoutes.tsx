import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCheckCircle } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import SelectCountry from "../UI/SelectCountry";

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
        <div>Airport: </div>
        {!departingCountry ? (
          <div>Please Select a Country</div>
        ) : (
          <select
            value={departingAirport}
            onChange={(e) => setDepartingAirport(e.target.value)}
            name="departing-airport"
            className="p-4 border-2 w-96"
          >
            <option value="">-- Select an Airport --</option>
            {airports.map((airport) =>
              airport.country?.code === departingCountry ? (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ) : null
            )}
          </select>
        )}
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div>Airport: </div>
          {!destinationCountry ? (
            <div>Please Select a Country</div>
          ) : (
            <select
              value={destinationAirport}
              onChange={(e) => setDestinationAirport(e.target.value)}
              name="departing-airport"
              className="p-4 border-2 w-96"
            >
              <option value="">-- Select an Airport --</option>
              {airports.map((airport) =>
                airport.country?.code === destinationCountry ? (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ) : null
              )}
            </select>
          )}
        </div>
      </div>
      <div className="pt-16 col-span-2 flex flex-col items-center space-y-4">
        <p className="text-xl font-bold">Available Airlines on That Route:</p>
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
                  <span className="text-lg">{airline.name}</span>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default AvailableRoutes;
