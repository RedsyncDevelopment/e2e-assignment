import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React from "react";
import { Airport } from "../../types";
import AirportInfo from "../airports/AirportInfo";

interface AirportMarkerProps {
  airport: Airport;
  activeMarker: string | null;
  onMarkerOpen: (marker: string) => void;
  onMarkerClose: () => void;
}

const AirportMarker: React.FC<AirportMarkerProps> = ({
  airport,
  activeMarker,
  onMarkerClose,
  onMarkerOpen,
}) => {
  return (
    <MarkerF
      position={airport.location}
      onClick={() => onMarkerOpen(airport.id!)}
      icon="http://maps.google.com/mapfiles/kml/pal2/icon48.png"
    >
      {activeMarker === airport.id && (
        <InfoWindowF onCloseClick={onMarkerClose}>
          <AirportInfo airport={airport} />
        </InfoWindowF>
      )}
    </MarkerF>
  );
};

export default AirportMarker;
