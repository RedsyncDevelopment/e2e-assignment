import React, { useEffect, useState } from "react";
import { updateAirport } from "../../app/reducers/airportSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { Airport } from "../../types";
import CheckboxAirlines from "../UI/CheckboxAirlines";
import SelectCountry from "../UI/SelectCountry";

interface UpdateAirportProps {
  airport: Airport;
  onUpdate: () => void;
}

const UpdateAirport: React.FC<UpdateAirportProps> = ({ airport, onUpdate }) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(({ country }) => country);
  const airlines = useAppSelector(({ airline }) => airline);

  const [airportName, setAirportName] = useState<string>(airport.name);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    airport.country?.code
  );
  const [isAirlineChecked, setIsAirlineChecked] = useState<boolean[]>([]);

  const [inputLat, setInputLat] = useState<string>(
    airport.location.lat.toString()
  );
  const [inputLng, setInputLng] = useState<string>(
    airport.location.lng.toString()
  );

  // when componenet mounts - set checked airlines to existing airlines inside airport
  useEffect(() => {
    setIsAirlineChecked(
      airport.airlines
        ? airlines.map(({ id }) =>
            airport.airlines?.map((airline) => airline.id).includes(id)
          )
        : new Array(airlines.length).fill(false)
    );
  }, [airlines, airport]);

  const handleChange = (position: number) => {
    // add true to poistion of checked airport
    const updatedCheckedList = isAirlineChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsAirlineChecked(updatedCheckedList);
  };

  const updateExistingAirport = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAirlines = airlines?.filter(
      (airline, index) => isAirlineChecked[index] === true
    );

    const inputLocation = { lat: +inputLat, lng: +inputLng };

    const updatedAirport: Airport = {
      name: airportName,
      country: countries?.find((country) => country.code === selectedCountry),
      location: inputLocation,
      airlines: selectedAirlines,
    };
    dispatch(updateAirport(airport.id!, updatedAirport));
    onUpdate();
  };

  return (
    <form onSubmit={updateExistingAirport} className="flex flex-col gap-4 p-4">
      <input
        className="border-2 p-4"
        placeholder="Airport Name"
        value={airportName}
        onChange={(e) => setAirportName(e.target.value)}
      />

      <div className="flex gap-4 items-center">
        <label>Location:</label>
        <input
          placeholder="lat"
          className="border-2 p-4"
          value={inputLat}
          onChange={(e) => setInputLat(e.target.value)}
        />
        <input
          placeholder="lng"
          className="border-2 p-4"
          value={inputLng}
          onChange={(e) => setInputLng(e.target.value)}
        />
      </div>
      <SelectCountry
        countries={countries}
        onChange={(e) => setSelectedCountry(e.target.value)}
        name="countries"
        id="country-select"
        value={selectedCountry}
      />
      <CheckboxAirlines
        airlines={airlines}
        type="checkbox"
        isAirlineChecked={isAirlineChecked}
        onAirlineChange={handleChange}
      />
      <button type="submit" className="update-btn">
        Update Airport
      </button>
    </form>
  );
};

export default UpdateAirport;
