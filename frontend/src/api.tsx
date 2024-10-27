import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: "http://localhost:5500/",
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("accessToken");
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post("http://localhost:5500/api/refreshAccessToken", {}, { withCredentials: true });
        const newAccessToken = cookies.get("accessToken");
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.log(err);
        
      }
    }

    return Promise.reject(error);
  }
);

export default api;
