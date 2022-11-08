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

const deleteOne = async (id: string) => {
  const respose = await axios.delete(`${baseUrl}/${id}`);
  return respose.status;
};

const updateOne = async (id: string, airline: Airline) => {
  const response = await axios.put(`${baseUrl}/${id}`, airline);
  return response.data;
};

const airlineService = {
  getAll,
  createNew,
  deleteOne,
  updateOne,
};

export default airlineService;
