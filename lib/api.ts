import axios from "axios";

const api = axios.create({
  baseURL: "https://08-daypilot-api.vercel.app",
  timeout: 20000,
  headers: { "Content-Type": "application/json" }
});

export default api;
