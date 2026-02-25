import axios from "axios";
import { store } from "../redux/store"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default instance;
