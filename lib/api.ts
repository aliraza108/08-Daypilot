import axios from "axios";

const api = axios.create({
  baseURL: "https://08-daypilot-api.vercel.app/api",
  headers: { "Content-Type": "application/json" }
});

export default api;
