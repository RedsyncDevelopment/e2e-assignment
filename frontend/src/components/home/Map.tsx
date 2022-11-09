import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useInitialMapSetup from "../../hooks/useInitialMapSetup";

import { GoogleLatLng } from "../../types";
import { center, options } from "../../utils/constants";
import AirportMarker from "./AirportMarker";
import MarkerForm from "./MarkerForm";

const Map: React.FC = () => {
  // initialize Map with custom hook
  const { mapCenter, mapOptions, mapRef, onLoad } = useInitialMapSetup(
    center,
    options
  );

  // useAppSelector() is just typesafe useSelector() hook
  const airports = useAppSelector(({ airport }) => airport);

  const [newAirportMarker, setNewAirportMarker] = useState<GoogleLatLng>(null);
  const [infoWindow, setInfoWindow] = useState<boolean>(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // add temporary marker to map on click
  const addNewAirportMarker = (e: google.maps.MapMouseEvent) => {
    // add new temporary marker to map position
    setNewAirportMarker(e.latLng!);
    mapRef.current?.panTo(e.latLng!);
    // close existing airports marker if open
    setActiveMarker(null);
  };

  // open infoWindow when user clicks on marker
  const openInfoWindow = (marker: string) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    // close newAirportMarker if open
    setNewAirportMarker(null);
    setInfoWindow(false);
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
        {/* render already existing airports with infoWindows */}
        {airports?.map((airport) => (
          <AirportMarker
            key={airport.id}
            airport={airport}
            activeMarker={activeMarker}
            onMarkerOpen={openInfoWindow}
            onMarkerClose={() => setActiveMarker(null)}
          />
        ))}
        {/* render new marker when user clicks on map with form to add new airport to that position */}
        {newAirportMarker && (
          <MarkerF
            position={newAirportMarker}
            // add info window to marker when it's done loading
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
