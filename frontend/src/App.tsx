import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { initializeAirlines } from "./app/reducers/airlineSlice";
import { initializeAirports } from "./app/reducers/airportSlice";
import { initializeCountries } from "./app/reducers/countrySlice";
import Airlines from "./components/airlines/Airlines";
import Airports from "./components/airports/Airports";
import Home from "./components/home/Home";
import AvailableRoutes from "./components/routes/AvailableRoutes";
import NotFound from "./components/UI/NotFound";
import useAppDispatch from "./hooks/useAppDispatch";

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
      <Route path="/routes" element={<AvailableRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
