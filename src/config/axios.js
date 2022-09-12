import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const axiosPrivateInstance = (token) => {
  return axios.create({
    baseURL: "http://localhost:1337/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
