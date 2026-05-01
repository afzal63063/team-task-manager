import axios from "axios";

const API = axios.create({
  baseURL: "https://teamtaskmanager.up.railway.app/api" 
});

export default API;