import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import SelectCountry from "../UI/SelectCountry";

interface AvailableRoutesProps {}

const AvailableRoutes: React.FC<AvailableRoutesProps> = ({}) => {
  const airlines = useAppSelector(({ airline }) => airline);
  const airports = useAppSelector(({ airport }) => airport);
  const countries = useAppSelector(({ country }) => country);

  const [departingCountry, setDepartingCountry] = useState<string>("");
  const [destinationCountry, setDestinationCountry] = useState<string>("");

  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-y-6 justify-items-center">
      <h1 className="p-6 text-2xl font-bold col-span-2">Where Can You Get?</h1>

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
          <select className="p-4 border-2">
            {countries?.map((country) => (
              <option key={country.id} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div>Airport: </div>
          {!departingCountry ? (
            <div>Please Select a Country</div>
          ) : (
            <select className="p-4 border-2">
              {countries?.map((country) => (
                <option key={country.id} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="pt-16 col-span-2 flex flex-col items-center space-y-4">
        <p>Available Airlines on That Route:</p>
        <ul>
          <li>test</li>
        </ul>
      </div>
    </div>
  );
};

export default AvailableRoutes;
