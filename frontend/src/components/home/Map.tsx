import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useInitialMapSetup,
} from "../../app/hooks";
import { center, options } from "../../utils/constants";
import AirportInfo from "../airports/AirportInfo";
import MarkerForm from "./MarkerForm";

interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
  // initialize Map with custom hook
  const { mapCenter, mapOptions, mapRef, onLoad } = useInitialMapSetup(
    center,
    options
  );

  // instantitae dispatch with typesafe hook
  const dispatch = useAppDispatch();
  // useAppSelector() is just typesafe useSelector() hook
  const airports = useAppSelector(({ airport }) => airport);

  const [newAirportMarker, setNewAirportMarker] =
    useState<google.maps.LatLng | null>(null);
  const [infoWindow, setInfoWindow] = useState<boolean>(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const addNewAirportMarker = (e: google.maps.MapMouseEvent) => {
    setNewAirportMarker(e.latLng!);
    mapRef.current?.panTo(e.latLng!);
    setActiveMarker(null);
  };

  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div>
      <GoogleMap
        zoom={7}
        center={mapCenter}
        mapContainerClassName="w-full h-screen"
        options={mapOptions}
        onLoad={onLoad}
        onClick={addNewAirportMarker}
      >
        {/* render airports */}
        {airports?.map((airport) => (
          <MarkerF
            key={airport.id}
            position={airport.location}
            onClick={() => handleActiveMarker(airport.id!)}
            icon="http://maps.google.com/mapfiles/kml/pal2/icon48.png"
          >
            {activeMarker === airport.id && (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <AirportInfo airport={airport} />
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
        {/* render new marker when user clicks on map with form to add new airport to that position */}
        {newAirportMarker && (
          <MarkerF
            position={newAirportMarker}
            onLoad={() => setInfoWindow(true)}
            icon="http://maps.google.com/mapfiles/kml/pal2/icon48.png"
          >
            {infoWindow && (
              <InfoWindowF
                onCloseClick={() => {
                  setNewAirportMarker(null);
                  setInfoWindow(false);
                }}
                options={{ maxWidth: 1000 }}
              >
                <MarkerForm location={newAirportMarker} />
              </InfoWindowF>
            )}
          </MarkerF>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
