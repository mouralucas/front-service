import { toast } from "react-toastify";
import { SessionResultsResponse } from "../../features/sports/racing/types/SessionResults";
import { URL_RACE_COMPETITION } from "../axios/ApiUrls";
import { getSportsData } from "../axios/Get";
import { Constructors, ConstructorsResponse } from "../../features/sports/racing/types/Constructors";


export const getSessionResult = async (): Promise<SessionResultsResponse | undefined> => {
    try {
        const sessionId: number = 7;
        const response: SessionResultsResponse | undefined = await getSportsData(URL_RACE_COMPETITION.sessions.result(sessionId));
        if (response == null) {
            toast.error('Houve um erro ao buscar os resultados da sessão');
            return;
        }

        return response;
    } catch {
        toast.error('Houve um erro ao buscar os resultados da sessão');
        return;
    }
}

export const getSeasonByCategory = async (): Promise<any> => {
    try {
        const categorySlug = 'f1';
        const response = await getSportsData(URL_RACE_COMPETITION.seasons.byCategory(categorySlug));

        return response;
    } catch {
        toast.error('Houve um erro ao buscar as temporadas da categoria')
        return;
    }
}

export const getConstructors = async (): Promise<Constructors[]> => {
    try{
        const response: ConstructorsResponse = await getSportsData(URL_RACE_COMPETITION.outro.contructors());
        return response.constructors;
    } catch {
        toast.error('Houve um erro ao buscar as construtoras')
        return [];
    }
}