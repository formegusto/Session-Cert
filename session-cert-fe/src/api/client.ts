import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_API;
const client = axios.create({
  baseURL,
});

export default client;
