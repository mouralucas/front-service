import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectAutocomplete from "../../../../components/form/SelectAutocomplete";
import { getSportsData } from "../../../../services/axios/Get";
import { formatDate } from "../../../../utils/datetime";
import EventResultTable from "../components/tables/EventResultTable";
import { SessionResultsResponse } from "../types/SessionResults";
import { URL_RACE_COMPETITION } from "../../../../services/axios/ApiUrls";
import { se } from "date-fns/locale";


const CarRaceLanding = (): ReactElement => {
    const [sessionResultData, setSessionResultData] = useState<SessionResultsResponse>();
    const [categorySeasons, setCategorySeasons] = useState([]);
    
        const getSessionResult = async (): Promise<SessionResultsResponse | undefined>  => {
            try {
                const sessionId: number = 7;
                const response = await getSportsData(URL_RACE_COMPETITION.sessions.result(sessionId));
                if (response == null) {
                    toast.error('Houve um erro ao buscar os resultados da sessão');
                    return;
                }
    
                setSessionResultData(response);
            } catch {
                toast.error('Houve um erro ao buscar os resultados da sessão');
                return;
            }
        }

        const getSeasonByCategory = async (): Promise<any> => {
            try {
                const categorySlug = 'f1';
                const response = await getSportsData(URL_RACE_COMPETITION.seasons.byCategory(categorySlug));

                setCategorySeasons(response)
            } catch {
                toast.error('Houve um erro ao buscar as temporadas da categoria')
            }
        }
    
        useEffect(() => {
            getSessionResult();
            getSeasonByCategory();
        }, [])

        useEffect(() => {
            console.log(categorySeasons);
        }, [categorySeasons])
    
    return (
        <div className="container">
            <Box>
                <Grid container spacing={2}>
                    <Grid size={12} >
                        <Card variant={"outlined"} sx={{ flex: 1, borderRadius: 4 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                                    <Grid container flex={1} direction={"row"}>
                                        <Grid size={4}>
                                            <SelectAutocomplete
                                                label="Temporada"
                                                value={1}
                                                options={categorySeasons}
                                                getOptionLabel={(option: any) => option.name}
                                                getOptionValue={(option: any) => option.id}
                                                onChange={(val) => console.log(val)}
                                                width={250}
                                            />
                                        </Grid>
                                         <Grid size={4} >
                                            <SelectAutocomplete
                                                label="Evento"
                                                value={1}
                                                options={[]}
                                                getOptionLabel={(option: any) => option.nickname}
                                                getOptionValue={(option: any) => option.accountId}
                                                onChange={(val) => console.log(val)}
                                                width={250}
                                            />
                                        </Grid>
                                        <Grid size={4} >
                                            <SelectAutocomplete
                                                label="Sessão"
                                                value={1}
                                                options={[]}
                                                getOptionLabel={(option: any) => option.nickname}
                                                getOptionValue={(option: any) => option.accountId}
                                                onChange={(val) => console.log(val)}
                                                width={250}
                                            />
                                        </Grid>
                                        <Grid size={12} sx={{ mt: 4}}>
                                            <Typography variant="h2">
                                                {sessionResultData?.eventName} - {sessionResultData?.sessionName}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Melnourne, {formatDate(sessionResultData?.eventStartDate)} - {formatDate(sessionResultData?.eventEndDate)}
                                            </Typography>
                                        </Grid>
                                        <Grid size={12} >
                                            <EventResultTable 
                                                sessionResultData={sessionResultData?.result}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default CarRaceLanding;