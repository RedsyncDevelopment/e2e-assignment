import axios from "axios";

const baseUrl = "http://localhost:3001/api/airports";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const airportService = {
  getAll,
};

export default airportService;
