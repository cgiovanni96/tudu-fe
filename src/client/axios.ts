import instance from "axios";
const axios = instance.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;
// axios.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export { axios };
