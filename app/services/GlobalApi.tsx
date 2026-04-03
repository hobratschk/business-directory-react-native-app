import axios from "axios";

export const axiosClient = axios.create({
  //had to correct this by powershell 'ipconfig /all' to find correct baseURL
  baseURL: "http://192.168.4.101:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});
