import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(config => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token; 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    if (window.location.href.includes("/sign-in")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default apiInstance;