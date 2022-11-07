import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import { googleMapsAPIKey } from "../../utils/constants";
import Map from "./Map";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey,
  });

  if (!isLoaded) return null;

  return <Map />;
};

export default Home;
