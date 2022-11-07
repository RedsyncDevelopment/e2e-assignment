import React from "react";
import { useAppSelector } from "../../app/hooks";
import AirlineInfo from "./AirlineInfo";

interface AirlinesProps {}

const Airlines: React.FC<AirlinesProps> = ({}) => {
  const airlines = useAppSelector(({ airline }) => airline);

  return (
    <>
      {airlines.map((airline) => (
        <div className="border-2">
          <AirlineInfo airline={airline} />
        </div>
      ))}
    </>
  );
};

export default Airlines;
