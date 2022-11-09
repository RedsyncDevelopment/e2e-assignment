import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { deleteAirport } from "../../app/reducers/airportSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Airport } from "../../types";
import FormButtons from "../UI/FormButtons";
import UpdateAirport from "./UpdateAirport";

interface AirportInfoProps {
  airport: Airport;
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport }) => {
  const dispatch = useAppDispatch();
  const location = {
    lat: +airport.location.lat,
    lng: +airport.location.lng,
  };

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const deleteAirportClick = (id: string) => {
    dispatch(deleteAirport(id));
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {!isEditOpen ? (
        <>
          <h1 className="p-4 text-xl font-bold">{airport.name}</h1>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold">Location:</p>
            <div className="flex gap-4">
              <p className="border-2 p-4">LAT: {location.lat}</p>
              <p className="border-2 p-4">LNG: {location.lng}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Country: </span>
            <h2 className="p-4 border-2 font-bold">{airport.country?.name}</h2>
          </div>
          <div className="border-2 p-4 flex flex-col gap-2">
            <p>Available Airlines:</p>
            {airport.airlines?.map((airline) => (
              <p className="flex gap-2 items-center" key={airline.id}>
                <span>
                  <AiOutlineCheckCircle />
                </span>
                <span>{airline.name}</span>
              </p>
            ))}
          </div>
        </>
      ) : (
        <UpdateAirport
          onUpdate={() => setIsEditOpen(false)}
          airport={airport}
        />
      )}
      <FormButtons
        isEditOpen={isEditOpen}
        onEditClick={() => setIsEditOpen((current) => !current)}
        onDeleteClick={() => deleteAirportClick(airport.id!)}
      />
    </div>
  );
};

export default AirportInfo;
