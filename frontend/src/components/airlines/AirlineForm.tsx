import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAirline } from "../../features/airline/airlineSlice";
import { Airline } from "../../types";

interface AirlineFormProps {}

const AirlineForm: React.FC<AirlineFormProps> = ({}) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(({ country }) => country);

  const [airlineName, setAirlineName] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const addAirline = (e: React.FormEvent) => {
    e.preventDefault();
    const newAirline: Airline = {
      name: airlineName,
      country: countries?.find((country) => country.code === selectedCountry),
    };
    dispatch(createAirline(newAirline));
    setAirlineName("");
    setSelectedCountry("");
  };

  return (
    <form onSubmit={addAirline} className="flex flex-col gap-2 p-4">
      <input
        placeholder="Airline Name"
        onChange={(e) => setAirlineName(e.target.value)}
        value={airlineName}
        className="p-4 border-2"
      />
      <select
        onChange={(e) => setSelectedCountry(e.target.value)}
        name="countries"
        id="country-select"
        value={selectedCountry}
        className="p-4 border-2"
      >
        <option value="">--Please choose an option--</option>
        {countries?.map((country) => (
          <option key={country.id} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <button type="submit" className="p-4 border-2  bg-green-300">
        Add Airline
      </button>
    </form>
  );
};

export default AirlineForm;
