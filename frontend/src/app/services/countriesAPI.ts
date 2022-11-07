import axios from "axios";

const baseUrl = "http://localhost:3001/api/countries";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const countryService = {
  getAll,
};

export default countryService;
