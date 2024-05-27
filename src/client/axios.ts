import instance from "axios";
const axios = instance.create({
  baseURL: "http://localhost:8888/",
});

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export { axios };
