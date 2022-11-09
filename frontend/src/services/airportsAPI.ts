import axios from "axios";
import { Airport } from "../types";

const baseUrl = "http://localhost:3001/api/airports";

const getAll = async (): Promise<Airport[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (airport: Airport): Promise<Airport[]> => {
  const response = await axios.post(baseUrl, airport);
  return response.data;
};

const deleteOne = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.status;
};

const updateOne = async (id: string, airport: Airport): Promise<Airport[]> => {
  const response = await axios.put(`${baseUrl}/${id}`, airport);
  return response.data;
};

const airportService = {
  getAll,
  createNew,
  deleteOne,
  updateOne,
};

export default airportService;
