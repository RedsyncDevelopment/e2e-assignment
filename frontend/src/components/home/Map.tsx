import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React from "react";
import { useAppSelector, useInitialMapSetup } from "../../app/hooks";
import { center, options } from "../../utils/constants";

interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
  // initialize Map with custom hook
  const { mapCenter, mapOptions, mapRef, onLoad } = useInitialMapSetup(
    center,
    options
  );

  // get airports from state
  const airports = useAppSelector(({ airport }) => airport);

  return (
    <div>
      <GoogleMap
        zoom={7}
        center={mapCenter}
        mapContainerClassName="w-full h-screen"
        options={mapOptions}
        onLoad={onLoad}
      >
        {airports?.map((airport) => (
          <MarkerF key={airport.id} position={airport.location}></MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
