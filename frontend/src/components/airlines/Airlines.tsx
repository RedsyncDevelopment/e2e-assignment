import React from "react";
import { useAppSelector } from "../../app/hooks";
import AirlineForm from "./AirlineForm";
import AirlineInfo from "./AirlineInfo";

interface AirlinesProps {}

const Airlines: React.FC<AirlinesProps> = ({}) => {
  const airlines = useAppSelector(({ airline }) => airline);

  return (
    <div className="flex items-center justify-center py-16 gap-4 h-screen">
      <div className="w-1/2">
        <AirlineForm />
      </div>
      <div className="w-1/2 overflow-y-scroll h-full border-2 flex flex-col gap-4">
        {airlines.map((airline) => (
          <div
            key={airline.id}
            className="m-4 border-2 flex flex-col items-center p-4"
          >
            <AirlineInfo airline={airline} />
            <div className="flex gap-4">
              <button className="p-4 bg-blue-300">Edit</button>
              <button className="p-4 bg-red-300">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Airlines;
