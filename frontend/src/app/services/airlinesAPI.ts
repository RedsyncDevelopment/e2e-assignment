import axios from "axios";

const baseUrl = "http://localhost:3001/api/airlines";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const airlineService = {
  getAll,
};

export default airlineService;
