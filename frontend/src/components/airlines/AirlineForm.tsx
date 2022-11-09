import React, { useState } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import useAppSelector from "../../app/hooks/useAppSelector";

import { createAirline } from "../../reducers/airlineSlice";
import { Airline } from "../../types";
import SelectCountry from "../UI/SelectCountry";

const AirlineForm: React.FC = () => {
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
      <SelectCountry
        countries={countries}
        onChange={(e) => setSelectedCountry(e.target.value)}
        name="countries"
        id="country-select"
        value={selectedCountry}
      />
      <button type="submit" className="add-btn">
        Add Airline
      </button>
    </form>
  );
};

export default AirlineForm;
