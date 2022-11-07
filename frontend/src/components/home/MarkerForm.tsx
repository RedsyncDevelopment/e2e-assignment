import React, { useState } from "react";
import AirlineForm from "../airlines/AirlineForm";
import AirportForm from "../airports/AirportForm";

interface MarkerFormProps {
  location: google.maps.LatLng;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ location }) => {
  const [isAirlineFormOpen, setIsAirlineFormOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <AirportForm location={location} />
        {isAirlineFormOpen ? <AirlineForm /> : null}
      </div>
      {/* buttons for opening and closing airline form */}
      {!isAirlineFormOpen ? (
        <button
          onClick={() => setIsAirlineFormOpen(true)}
          className="p-4 border-2 bg-blue-300"
        >
          Open Airline Form
        </button>
      ) : (
        <button
          onClick={() => setIsAirlineFormOpen(false)}
          className="p-4 border-2 bg-red-300"
        >
          Close Airline Form
        </button>
      )}
    </div>
  );
};

export default MarkerForm;
