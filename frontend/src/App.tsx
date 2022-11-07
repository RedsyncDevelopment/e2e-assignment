import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { initializeAirlines } from "./features/airline/airlineSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAirlines());
  }, [dispatch]);

  const airlines = useAppSelector(({ airline }) => {
    return airline;
  });

  console.log(airlines);

  return <div></div>;
}

export default App;
