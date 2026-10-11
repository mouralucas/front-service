import { AxiosInstance } from "axios";
import { createAxiosInstance } from "./axiosConfig.tsx";
import { URL_SPORTS_DATA_BASE } from "../baseUrl.tsx";

const sports_data_instance: AxiosInstance = createAxiosInstance(URL_SPORTS_DATA_BASE);

export default sports_data_instance