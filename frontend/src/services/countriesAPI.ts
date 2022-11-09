import axios from "axios";
import { Country } from "./../types.d";

const baseUrl = "http://localhost:3001/api/countries";

const getAll = async (): Promise<Country[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const countryService = {
  getAll,
};

export default countryService;
