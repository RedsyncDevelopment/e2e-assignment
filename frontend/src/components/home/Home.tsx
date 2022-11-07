import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import Map from "./Map";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBHpEkwrtsJE4ggUey3Cr3mDgmx6E0e32U",
  });

  if (!isLoaded) return null;

  return <Map />;
};

export default Home;
