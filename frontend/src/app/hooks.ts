import { useCallback, useMemo, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInitialMapSetup = (
  center: google.maps.LatLngLiteral,
  options: google.maps.MapOptions
) => {
  const mapRef = useRef<google.maps.Map>();
  // memoizing the center and options because they are passed by reference and react will rerender a <GoogleMap> component every time even if center or options don't change - this prevent unnecessary rerenders
  const mapCenter = useMemo<google.maps.LatLngLiteral>(() => center, []);
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  // when the map loads, assign it to the mapRef
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  return { mapCenter, mapOptions, mapRef, onLoad };
};
