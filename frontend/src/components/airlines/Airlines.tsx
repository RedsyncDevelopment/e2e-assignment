import React from "react";
import useAppSelector from "../../hooks/useAppSelector";

import AirlineForm from "./AirlineForm";
import AirlineInfo from "./AirlineInfo";

const Airlines: React.FC = () => {
  const airlines = useAppSelector(({ airline }) => airline);

  return (
    <div className="flex items-center justify-center gap-4 h-screen">
      <div className="w-1/2">
        <AirlineForm />
      </div>
      <div className="w-1/2 overflow-y-scroll h-full flex flex-col gap-4">
        {airlines.map((airline) => (
          <div
            key={airline.id}
            className="m-4 border-2 flex flex-col items-center p-4"
          >
            <AirlineInfo airline={airline} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Airlines;
