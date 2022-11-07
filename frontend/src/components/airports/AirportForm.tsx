import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAirport } from "../../features/airport/airportSlice";
import { Airport } from "../../types";

interface AirportFormProps {
  location: google.maps.LatLng;
}

const AirportForm: React.FC<AirportFormProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(({ country }) => country);
  const airlines = useAppSelector(({ airline }) => airline);

  const [airportName, setAirportName] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isAirlineChecked, setIsAirlineChecked] = useState<boolean[]>(
    new Array(airlines?.length).fill(false)
  );

  const handleChange = (position: number) => {
    const updatedCheckedList = isAirlineChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsAirlineChecked(updatedCheckedList);
  };

  const addNewAirportToMap = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAirlines = airlines?.filter(
      (airline, index) => isAirlineChecked[index] === true
    );

    const newAirport: Airport = {
      name: airportName,
      country: countries?.find((country) => country.code === selectedCountry),
      location: location.toJSON(),
      airlines: selectedAirlines,
    };
    dispatch(createAirport(newAirport));
    setAirportName("");
    setIsAirlineChecked(new Array(airlines?.length).fill(false));
    setSelectedCountry("");
  };

  return (
    <form onSubmit={addNewAirportToMap} className="flex flex-col gap-4">
      <input
        className="border-2 p-4"
        placeholder="Airport Name"
        value={airportName}
        onChange={(e) => setAirportName(e.target.value)}
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
      <div className="border-2 p-4">
        <h2>Select airline</h2>
        {airlines?.map((airline, index) => (
          <div className="flex gap-2" key={airline.id}>
            <input
              id={airline.id}
              type="checkbox"
              value={airline.name}
              name={airline.name}
              checked={isAirlineChecked[index]}
              onChange={() => handleChange(index)}
            />
            <label htmlFor={airline.id}>
              {airline.name} from {airline.country?.name}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="p-4 border-2 bg-green-300">
        Add Airport
      </button>
    </form>
  );
};

export default AirportForm;
