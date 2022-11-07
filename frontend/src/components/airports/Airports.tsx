import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteAirport } from "../../features/airport/airportSlice";
import AirportForm from "./AirportForm";
import AirportInfo from "./AirportInfo";

interface AirportsProps {}

const Airports: React.FC<AirportsProps> = ({}) => {
  const dispatch = useAppDispatch();
  const airports = useAppSelector(({ airport }) => airport);

  const deleteAirportClick = (id: string) => {
    dispatch(deleteAirport(id));
  };

  return (
    <div className="flex items-center justify-center py-16 gap-4 h-screen">
      <div className="w-1/2">
        <AirportForm />
      </div>
      <div className="w-1/2 overflow-y-scroll h-full border-2 flex flex-col gap-4">
        {airports.map((airport) => (
          <div
            key={airport.id}
            className="m-4 border-2 flex flex-col items-center p-4"
          >
            <AirportInfo airport={airport} />
            <div className="flex gap-4">
              <button className="p-4 bg-blue-300">Edit</button>
              <button
                onClick={() => deleteAirportClick(airport.id!)}
                className="p-4 bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Airports;
