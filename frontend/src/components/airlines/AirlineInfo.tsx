import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { deleteAirline } from "../../app/reducers/airlineSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Airline } from "../../types";
import FormButtons from "../UI/FormButtons";
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
      <FormButtons
        isEditOpen={isEditOpen}
        onEditClick={() => setIsEditOpen((current) => !current)}
        onDeleteClick={() => deleteAirlineClick(airline.id!)}
      />
    </div>
  );
};

export default AirlineInfo;
