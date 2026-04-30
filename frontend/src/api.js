import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-managers-production.up.railway.app/api"
});

export default API;