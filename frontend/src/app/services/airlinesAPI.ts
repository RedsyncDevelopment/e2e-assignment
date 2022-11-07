import axios from "axios";
import { Airline } from "./../../types.d";

const baseUrl = "http://localhost:3001/api/airlines";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (airline: Airline) => {
  const response = await axios.post(baseUrl, airline);
  return response.data;
};

const airlineService = {
  getAll,
  createNew,
};

export default airlineService;
