import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataGrid from '../../../../../components/table/DataGrid.tsx';
import { getSportsData } from "../../../../../services/axios/Get.tsx";
import { SessionResults } from "../../types/SessionResults.ts";


const EventResultTable = (): ReactElement => {
    const [sessionResultData, setSessionResultData] = useState<SessionResults[]>([]);

    const getSessionResult = async (): Promise<SessionResults[]> => {
        try {
            const response = await getSportsData("/api/v1/sessions/result");
            if (response == null) {
                toast.error('Houve um erro ao buscar os resultados da sessão');
                return [];
            }

            return response;
        } catch {
            toast.error('Houve um erro ao buscar os resultados da sessão');
            return []
        }
    }

    useEffect(() => {
        const loadSessionResult = async () => {
            const data = await getSessionResult();
            console.log(data);
            setSessionResultData(data);
        };

        void loadSessionResult();
    }, [])

    const columns: GridColDef<SessionResults>[] = [
        {
            field: "id", headerName: "Id", flex: .5
        },
        {
            field: "eventName", headerName: "Evento", flex: 1
        },
        {
            field: "sessionName", headerName: "Sessão", flex: 1
        },
        {
            field: "lastName", headerName: "Piloto", flex: 1
        },
        {
            field: "constructorName", headerName: "Equipe", flex: 1
        },
        {
            field: "laps", headerName: "Voltas", flex: 1
        },
        {
            field: "raceTime", headerName: "Tempo", flex: 1
        },
        {
            field: "gap", headerName: "Intervalo", flex: 1
        },
    ]

    return (
        <Box sx={{ display: 'block ' }}>
            <DataGrid
                columns={columns}
                data={sessionResultData}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    id: false,
                }}
            />
        </Box>
    )
}

export default EventResultTable;