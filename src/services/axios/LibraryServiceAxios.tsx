import { AxiosInstance } from "axios";
import { createAxiosInstance } from "./axiosConfig.tsx";
import { URL_LIBRARY_BASE } from "../baseUrl.tsx";

const library_connections_instance: AxiosInstance = createAxiosInstance(URL_LIBRARY_BASE);

export default library_connections_instance