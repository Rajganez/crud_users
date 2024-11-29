import axios from "axios";

export const clientAPI = axios.create({
  // JSON Placeholder Link
  baseURL: "https://jsonplaceholder.typicode.com/users",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
