import React, { useEffect, useState } from "react";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import useAppSelector from "../../app/hooks/useAppSelector";
import { createAirport } from "../../reducers/airportSlice";
import { Airport } from "../../types";
import CheckoxAirlines from "../UI/CheckboxAirlines";
import SelectCountry from "../UI/SelectCountry";

interface AirportFormProps {
  location?: google.maps.LatLng;
}

const AirportForm: React.FC<AirportFormProps> = ({ location }) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(({ country }) => country);
  const airlines = useAppSelector(({ airline }) => airline);

  const [airportName, setAirportName] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isAirlineChecked, setIsAirlineChecked] = useState<boolean[]>([]);
  const [inputLat, setInputLat] = useState<string>("");
  const [inputLng, setInputLng] = useState<string>("");

  // when componenet mounts - set airlines checkbox state to false
  useEffect(() => {
    setIsAirlineChecked(new Array(airlines.length).fill(false));
  }, [airlines]);

  const handleChange = (position: number) => {
    // add true to poistion of checked airport
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

    const inputLocation = { lat: +inputLat, lng: +inputLng };

    const newAirport: Airport = {
      name: airportName,
      country: countries?.find((country) => country.code === selectedCountry),
      // if created with map click - include location from map, else include typed location
      location: location ? location.toJSON() : inputLocation,
      airlines: selectedAirlines,
    };
    dispatch(createAirport(newAirport));
    setAirportName("");
    setIsAirlineChecked(new Array(airlines?.length).fill(false));
    setSelectedCountry("");
    setInputLat("");
    setInputLng("");
  };

  return (
    <form onSubmit={addNewAirportToMap} className="flex flex-col gap-4 p-4">
      <input
        className="border-2 p-4"
        placeholder="Airport Name"
        value={airportName}
        onChange={(e) => setAirportName(e.target.value)}
      />
      {!location && (
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
      )}
      <SelectCountry
        countries={countries}
        onChange={(e) => setSelectedCountry(e.target.value)}
        name="countries"
        id="country-select"
        value={selectedCountry}
      />
      <CheckoxAirlines
        airlines={airlines}
        type="checkbox"
        isAirlineChecked={isAirlineChecked}
        onAirlineChange={handleChange}
      />
      <button type="submit" className="add-btn">
        Add Airport
      </button>
    </form>
  );
};

export default AirportForm;
