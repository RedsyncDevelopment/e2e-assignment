import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateAirline } from "../../features/airline/airlineSlice";
import { Airline } from "../../types";
import SelectAirports from "../UI/SelectAirports";
import SelectCountry from "../UI/SelectCountry";

interface UpdateAirlineProps {
  airline: Airline;
}

const UpdateAirline: React.FC<UpdateAirlineProps> = ({ airline }) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(({ country }) => country);
  const airports = useAppSelector(({ airport }) => airport);

  const [airlineName, setAirlineName] = useState<string>(airline.name);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    airline.country?.code
  );
  const [isAirportChecked, setIsAirportChecked] = useState<boolean[]>([]);

  // when componenet mounts - set checked airports to existing airports inside airline
  useEffect(() => {
    setIsAirportChecked(
      airline.airports
        ? airports.map(({ id }) =>
            airline.airports?.map((airline) => airline.id).includes(id)
          )
        : new Array(airports.length).fill(false)
    );
  }, [airports, airline]);

  const handleChange = (position: number) => {
    // add true to poistion of checked airport
    const updatedCheckedList = isAirportChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsAirportChecked(updatedCheckedList);
  };

  const updateExistingAirline = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAirports = airports?.filter(
      (airport, index) => isAirportChecked[index] === true
    );

    const updatedAirline: Airline = {
      name: airlineName,
      country: countries?.find((country) => country.code === selectedCountry),
      airports: selectedAirports,
    };

    dispatch(updateAirline(airline.id!, updatedAirline));
  };

  return (
    <form onSubmit={updateExistingAirline} className="flex flex-col gap-2 p-4">
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
      <SelectAirports
        airports={airports}
        type="checkbox"
        isAirportChecked={isAirportChecked}
        onAirportChange={handleChange}
      />
      <button type="submit" className="update-btn">
        Update Airline
      </button>
    </form>
  );
};

export default UpdateAirline;
