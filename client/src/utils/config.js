import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    authorization: `Bearer`,
  },
});
