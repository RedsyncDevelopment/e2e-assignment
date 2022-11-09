import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import useAppDispatch from "../../app/hooks/useAppDispatch";
import { deleteAirline } from "../../reducers/airlineSlice";
import { Airline } from "../../types";
import UpdateAirline from "./UpdateAirline";

interface AirlineInfoProps {
  airline: Airline;
}

const AirlineInfo: React.FC<AirlineInfoProps> = ({ airline }) => {
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const deleteAirlineClick = (id: string) => {
    dispatch(deleteAirline(id));
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {!isEditOpen ? (
        <>
          <h1 className="p-4 text-xl font-bold">{airline.name}</h1>
          <div className="flex items-center space-x-4">
            <span>Country: </span>
            <h2 className="p-4 border-2 font-bold">{airline.country?.name}</h2>
          </div>
          <div className="border-2 p-4 flex flex-col gap-2">
            <p>Can be found at:</p>
            {airline.airports?.map((airport) => (
              <p className="flex gap-2 items-center" key={airport.id}>
                <span>
                  <AiOutlineCheckCircle />
                </span>
                <span>{airport.name}</span>
              </p>
            ))}
          </div>
        </>
      ) : (
        <UpdateAirline
          onUpdate={() => setIsEditOpen(false)}
          airline={airline}
        />
      )}
      <div className="w-full flex space-x-2">
        <button
          onClick={() => setIsEditOpen((current) => !current)}
          className="edit-btn"
        >
          {isEditOpen ? "Close" : "Edit"}
        </button>
        <button
          onClick={() => deleteAirlineClick(airline.id!)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AirlineInfo;
