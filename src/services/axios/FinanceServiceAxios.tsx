import { AxiosInstance } from "axios";
import { createAxiosInstance } from "./axiosConfig.tsx";
import { URL_FINANCE_BASE } from "../baseUrl.tsx";

const finance_connections_instance: AxiosInstance = createAxiosInstance(URL_FINANCE_BASE);

export default finance_connections_instance