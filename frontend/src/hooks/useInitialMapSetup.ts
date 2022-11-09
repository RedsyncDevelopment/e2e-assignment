import { useCallback, useMemo, useRef } from "react";

const useInitialMapSetup = (
  center: google.maps.LatLngLiteral,
  options: google.maps.MapOptions
) => {
  const mapRef = useRef<google.maps.Map>();
  // memoizing the center and options because they are passed by reference and react will rerender a <GoogleMap> component every time even if center or options don't change - this prevent unnecessary rerenders
  const mapCenter = useMemo<google.maps.LatLngLiteral>(() => center, [center]);
  const mapOptions = useMemo<google.maps.MapOptions>(() => options, [options]);
  // when the map loads, assign it to the mapRef
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  return { mapCenter, mapOptions, mapRef, onLoad };
};

export default useInitialMapSetup;
