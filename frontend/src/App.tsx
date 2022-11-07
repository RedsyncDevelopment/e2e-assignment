import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import Airlines from "./components/airlines/Airlines";
import Airports from "./components/airports/Airports";
import Home from "./components/home/Home";
import NotFound from "./components/UI/NotFound";
import { initializeAirlines } from "./features/airline/airlineSlice";
import { initializeAirports } from "./features/airport/airportSlice";
import { initializeCountries } from "./features/country/countrySlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeAirlines());
    dispatch(initializeAirports());
    dispatch(initializeCountries());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/airports" element={<Airports />} />
      <Route path="/airlines" element={<Airlines />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
