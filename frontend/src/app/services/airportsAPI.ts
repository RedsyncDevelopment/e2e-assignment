import axios from "axios";
import { Airport } from "../../types";

const baseUrl = "http://localhost:3001/api/airports";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (airport: Airport) => {
  const response = await axios.post(baseUrl, airport);
  return response.data;
};

const airportService = {
  getAll,
  createNew,
};

export default airportService;
