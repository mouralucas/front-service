import { AxiosInstance } from "axios";
import { createAxiosInstance } from "../../../services/axios/axiosConfig.tsx";
import { URL_USER_BASE } from "../../../services/baseUrl.tsx";


const user_connections_instance: AxiosInstance = createAxiosInstance(URL_USER_BASE);

export default user_connections_instance;