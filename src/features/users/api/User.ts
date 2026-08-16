import user_connections_instance from "./UserAxiosConf";


const getUserData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await user_connections_instance.get(url, { params: params });
    } catch {
        response = null;
    }

    return response?.data;

}

export default getUserData;