import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import SelectAutocomplete from "../../../../components/form/SelectAutocomplete";
import { getSeasonByCategory, getSessionResult } from "../../../../services/getCommonData/SportsData";
import { formatDate } from "../../../../utils/datetime";
import EventResultTable from "../components/tables/EventResultTable";
import { SessionResultsResponse } from "../types/SessionResults";



const CarRaceLanding = (): ReactElement => {
    const [sessionResultData, setSessionResultData] = useState<SessionResultsResponse>();
    const [categorySeasons, setCategorySeasons] = useState([]);

    const fetchData: () => Promise<void> = async () => {
        setSessionResultData(await getSessionResult());
        setCategorySeasons(await getSeasonByCategory());
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        // console.log(categorySeasons);
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
                                        <Grid size={3}>
                                            <SelectAutocomplete
                                                label="Categoria"
                                                value={1}
                                                options={categorySeasons}
                                                getOptionLabel={(option: any) => option.name}
                                                getOptionValue={(option: any) => option.id}
                                                onChange={(val) => console.log(val)}
                                                width={250}
                                            />
                                        </Grid>
                                        <Grid size={3}>
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
                                        <Grid size={3} >
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
                                        <Grid size={3} >
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
                                        <Grid size={12} sx={{ mt: 4 }}>
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