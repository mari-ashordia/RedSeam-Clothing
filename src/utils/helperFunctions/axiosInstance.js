import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://api.redseam.redberryinternship.ge/api",
})