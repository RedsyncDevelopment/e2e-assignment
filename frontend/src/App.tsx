import { Route, Routes } from "react-router-dom";
import Airlines from "./components/airlines/Airlines";
import Airports from "./components/airports/Airports";
import Map from "./components/map/Map";
import NotFound from "./components/UI/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/airports" element={<Airports />} />
      <Route path="/airlines" element={<Airlines />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
